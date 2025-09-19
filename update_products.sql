-- Clear and populate product table with supplement data
-- Execute this script in MySQL Workbench or command line

USE diet_fitness_mysql;

-- Delete all existing product data
DELETE FROM product;

-- Reset auto-increment if needed
ALTER TABLE product AUTO_INCREMENT = 1;

-- Insert new supplement data
INSERT INTO product (name, description, price, category, imageUrl) VALUES
-- Protein Supplements
('Whey Protein Isolate', 'High-quality whey protein isolate with 90% protein content. Fast absorption for post-workout recovery. Low in lactose and fat.', 45.99, 'Supplements', 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'),

('Casein Protein', 'Slow-digesting protein perfect for nighttime recovery. Provides sustained amino acid release for 6-8 hours.', 39.99, 'Supplements', 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'),

('Plant-Based Protein', 'Complete protein blend from pea, rice, and hemp. Vegan-friendly with all essential amino acids.', 42.99, 'Supplements', 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'),

-- Pre-Workout Supplements
('Pre-Workout Energy', 'Advanced pre-workout formula with caffeine, beta-alanine, and citrulline for enhanced performance and energy.', 34.99, 'Supplements', 'https://images.unsplash.com/photo-1594882645126-14020914d58d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'),

('Natural Pre-Workout', 'Clean pre-workout with natural caffeine from green tea and organic ingredients. No artificial colors.', 29.99, 'Supplements', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'),

-- Post-Workout & Recovery
('BCAA Recovery', 'Branched-chain amino acids in 2:1:1 ratio. Supports muscle recovery and reduces fatigue during workouts.', 28.99, 'Supplements', 'https://images.unsplash.com/photo-1559757175-0eb30cd7fdf2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'),

('Creatine Monohydrate', 'Pure creatine monohydrate for increased strength, power, and muscle mass. Unflavored micronized powder.', 19.99, 'Supplements', 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'),

('Post-Workout Recovery', 'Complete post-workout formula with protein, carbs, and electrolytes for optimal recovery.', 38.99, 'Supplements', 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'),

-- Vitamins & Minerals
('Multivitamin Complex', 'Comprehensive daily multivitamin with 25+ essential vitamins and minerals. Supports overall health.', 24.99, 'Supplements', 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'),

('Vitamin D3', 'High-potency Vitamin D3 (5000 IU) for bone health, immune support, and mood regulation.', 16.99, 'Supplements', 'https://images.unsplash.com/photo-1550572017-edd951aa8ca0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'),

('Omega-3 Fish Oil', 'Premium fish oil with EPA and DHA for heart health, brain function, and inflammation support.', 32.99, 'Supplements', 'https://images.unsplash.com/photo-1559181567-c3190ca9959b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'),

('Magnesium Complex', 'Highly absorbable magnesium blend for muscle function, sleep quality, and stress management.', 21.99, 'Supplements', 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'),

-- Weight Management
('Fat Burner', 'Thermogenic fat burner with green tea extract, caffeine, and L-carnitine. Supports metabolism and energy.', 44.99, 'Supplements', 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'),

('CLA Complex', 'Conjugated Linoleic Acid for body composition support and lean muscle maintenance during cutting.', 26.99, 'Supplements', 'https://images.unsplash.com/photo-1556909008-28141d7acf4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'),

('Appetite Control', 'Natural appetite suppressant with glucomannan and chromium to support healthy weight management.', 31.99, 'Supplements', 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'),

-- Digestive Health
('Digestive Enzymes', 'Comprehensive enzyme blend to support digestion and nutrient absorption. Reduces bloating.', 23.99, 'Supplements', 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'),

('Probiotic Complex', '50 billion CFU probiotic with 12 strains for gut health, immune support, and digestive balance.', 35.99, 'Supplements', 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'),

-- Sleep & Recovery
('ZMA Formula', 'Zinc, Magnesium, and Vitamin B6 combination for better sleep quality and recovery.', 18.99, 'Supplements', 'https://images.unsplash.com/photo-1550572017-edd951aa8ca0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'),

('Melatonin', 'Natural sleep aid with 5mg melatonin for improved sleep onset and quality. Non-habit forming.', 14.99, 'Supplements', 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'),

-- Performance Enhancers
('Beta-Alanine', 'Pure beta-alanine powder for improved muscular endurance and reduced fatigue during high-intensity training.', 22.99, 'Supplements', 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'),

('Citrulline Malate', 'L-Citrulline for enhanced blood flow, muscle pumps, and exercise performance. 2:1 ratio with malate.', 27.99, 'Supplements', 'https://images.unsplash.com/photo-1594882645126-14020914d58d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'),

('Nitric Oxide Booster', 'Advanced NO formula with arginine and citrulline for maximum muscle pumps and vascularity.', 33.99, 'Supplements', 'https://images.unsplash.com/photo-1559757175-0eb30cd7fdf2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'),

-- Specialty Supplements
('Collagen Peptides', 'Hydrolyzed collagen for joint health, skin elasticity, and hair/nail strength. Unflavored.', 29.99, 'Supplements', 'https://images.unsplash.com/photo-1559181567-c3190ca9959b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'),

('Ashwagandha Extract', 'Adaptogenic herb for stress management, cortisol regulation, and improved athletic performance.', 19.99, 'Supplements', 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'),

('Green Superfood', 'Nutrient-dense greens powder with spirulina, chlorella, and organic vegetables. Alkalizing blend.', 41.99, 'Supplements', 'https://images.unsplash.com/photo-1556909008-28141d7acf4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80');

-- Verify the data was inserted
SELECT COUNT(*) as total_products FROM product;
SELECT name, price, category FROM product ORDER BY price DESC LIMIT 5;