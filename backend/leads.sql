CREATE TABLE leads (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(50),
  company VARCHAR(255),
  notes TEXT,
  location VARCHAR(255),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
