#!/usr/bin/env node

const mysql = require('mysql2/promise');

class MySQLConnectorMCP {
  constructor() {
    this.connection = null;
    this.config = {
      host: process.env.MYSQL_HOST || 'localhost',
      port: parseInt(process.env.MYSQL_PORT) || 3306,
      database: process.env.MYSQL_DATABASE || 'diet_fitness_mysql',
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD
    };
  }

  async connect() {
    if (!this.connection) {
      this.connection = await mysql.createConnection(this.config);
    }
    return this.connection;
  }

  async executeQuery(query, params = []) {
    try {
      const conn = await this.connect();
      const [rows] = await conn.execute(query, params);
      return {
        success: true,
        data: rows,
        rowCount: Array.isArray(rows) ? rows.length : rows.affectedRows
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        sqlState: error.sqlState
      };
    }
  }

  async getSchema(tableName = null) {
    try {
      const query = tableName
        ? 'DESCRIBE ??'
        : 'SHOW TABLES';
      const params = tableName ? [tableName] : [];

      return await this.executeQuery(query, params);
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  async analyzePerformance(query) {
    try {
      const explainQuery = `EXPLAIN FORMAT=JSON ${query}`;
      return await this.executeQuery(explainQuery);
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  async close() {
    if (this.connection) {
      await this.connection.end();
      this.connection = null;
    }
  }
}

// MCP Server Protocol Implementation
const server = new MySQLConnectorMCP();

process.stdin.on('data', async (data) => {
  try {
    const request = JSON.parse(data.toString());
    let response;

    switch (request.method) {
      case 'execute_query':
        response = await server.executeQuery(request.params.query, request.params.params);
        break;
      case 'get_schema':
        response = await server.getSchema(request.params.tableName);
        break;
      case 'analyze_performance':
        response = await server.analyzePerformance(request.params.query);
        break;
      default:
        response = { success: false, error: 'Unknown method' };
    }

    process.stdout.write(JSON.stringify({ id: request.id, result: response }) + '\n');
  } catch (error) {
    process.stdout.write(JSON.stringify({
      id: request.id || 0,
      error: { message: error.message }
    }) + '\n');
  }
});

process.on('SIGTERM', async () => {
  await server.close();
  process.exit(0);
});