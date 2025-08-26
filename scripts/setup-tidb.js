import mysql from 'mysql2/promise';

const DATABASE_URL = 'mysql://38q6w5SNZeFHRbp.root:BP5A9pUQXmh3V5HC@gateway01.ap-southeast-1.prod.aws.tidbcloud.com:4000/test';

async function setupTiDB() {
  console.log('🔄 Connecting to TiDB database...');
  
  const connection = await mysql.createConnection({
    uri: DATABASE_URL,
    ssl: {
      rejectUnauthorized: true
    }
  });

  try {
    // Test connection
    await connection.execute('SELECT 1');
    console.log('✅ Connected to TiDB successfully!');

    // Check existing tables
    const [tables] = await connection.execute('SHOW TABLES');
    console.log('📊 Current tables:', tables);

    // Create users table if not exists
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(255) PRIMARY KEY DEFAULT (UUID()),
        username TEXT NOT NULL,
        password TEXT NOT NULL,
        credits INT NOT NULL DEFAULT 10,
        device_id VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE KEY unique_username (username(255))
      )
    `);
    console.log('✅ Users table ready');

    // Create video_generations table if not exists
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS video_generations (
        id VARCHAR(255) PRIMARY KEY DEFAULT (UUID()),
        user_id VARCHAR(255),
        task_id VARCHAR(500) NOT NULL,
        type VARCHAR(50) NOT NULL,
        prompt TEXT NOT NULL,
        image_url TEXT,
        mask_image_url TEXT,
        strength VARCHAR(50),
        samples INT DEFAULT 1,
        steps INT DEFAULT 31,
        scheduler VARCHAR(100),
        aspect_ratio VARCHAR(10) NOT NULL,
        model VARCHAR(50) NOT NULL,
        watermark VARCHAR(500),
        hd_generation BOOLEAN DEFAULT FALSE,
        status VARCHAR(50) NOT NULL,
        result_urls JSON,
        hd_result_url TEXT,
        error_message TEXT,
        credits_used INT NOT NULL,
        api_key_id VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        completed_at TIMESTAMP NULL,
        enhancement_status VARCHAR(50),
        enhanced_result_urls JSON,
        enhancement_started_at TIMESTAMP NULL,
        enhancement_completed_at TIMESTAMP NULL,
        enhancement_error_message TEXT,
        UNIQUE KEY unique_task_id (task_id)
      )
    `);
    console.log('✅ Video generations table ready');

    // Create api_keys table if not exists
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS api_keys (
        id VARCHAR(255) PRIMARY KEY DEFAULT (UUID()),
        name TEXT NOT NULL,
        api_key TEXT NOT NULL,
        credits INT NOT NULL DEFAULT 0,
        is_active BOOLEAN NOT NULL DEFAULT TRUE,
        last_checked TIMESTAMP NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE KEY unique_api_key (api_key(255))
      )
    `);
    console.log('✅ API keys table ready');

    // Insert demo user if not exists
    const [existingUsers] = await connection.execute(
      'SELECT id FROM users WHERE username = ?', 
      ['demo-user']
    );

    if (existingUsers.length === 0) {
      // Hash for password "demo123"
      const hashedPassword = '$2b$10$c80dY4w9yhpX1VS.QEjrq.rkVYKFJpD0oBkKxFGTOAeFAE/q8.K4y';
      
      await connection.execute(
        'INSERT INTO users (id, username, password, credits) VALUES (?, ?, ?, ?)',
        ['default-user-id', 'demo-user', hashedPassword, 50]
      );
      console.log('✅ Demo user created with 50 credits');
    } else {
      console.log('✅ Demo user already exists');
    }

    console.log('🎉 TiDB database setup complete!');
    
  } catch (error) {
    console.error('❌ Database setup error:', error);
    throw error;
  } finally {
    await connection.end();
  }
}

// Run setup
setupTiDB().catch(console.error);