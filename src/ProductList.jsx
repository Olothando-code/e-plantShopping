.product-list-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
}

.product-list-container h1 {
  text-align: center;
  color: #2d5016;
  margin-bottom: 2rem;
  font-size: 2.5rem;
}

.category-filter {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1rem;
  background-color: #f9fff5;
  border-radius: 10px;
}

.category-filter button {
  padding: 0.7rem 1.5rem;
  border: 2px solid #3a7c1f;
  background-color: white;
  color: #3a7c1f;
  border-radius: 25px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
}

.category-filter button:hover {
  background-color: #f0f9eb;
  transform: translateY(-2px);
}

.category-filter button.active {
  background-color: #3a7c1f;
  color: white;
}

.category-section {
  margin-bottom: 3rem;
}

.category-title {
  color: #2d5016;
  border-bottom: 3px solid #a8d18c;
  padding-bottom: 0.5rem;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
}

.plants-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 1rem;
}

.plant-card {
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid #e8f5e9;
}

.plant-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.plant-image {
  height: 200px;
  overflow: hidden;
}

.plant-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.plant-card:hover .plant-image img {
  transform: scale(1.05);
}

.plant-info {
  padding: 1.5rem;
}

.plant-name {
  color: #2d5016;
  margin: 0 0 0.5rem 0;
  font-size: 1.3rem;
  font-weight: 600;
}

.plant-category {
  color: #666;
  font-size: 0.9rem;
  margin: 0 0 0.5rem 0;
  text-transform: capitalize;
}

.plant-price {
  color: #3a7c1f;
  font-size: 1.4rem;
  font-weight: bold;
  margin: 0 0 1rem 0;
}

.add-to-cart-btn {
  width: 100%;
  padding: 0.8rem;
  background-color: #3a7c1f;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.add-to-cart-btn:hover {
  background-color: #2d5016;
}

/* Responsive Design */
@media (max-width: 768px) {
  .product-list-container {
    padding: 1rem;
  }
  
  .plants-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
  }
  
  .category-filter {
    padding: 0.5rem;
  }
  
  .category-filter button {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .plants-grid {
    grid-template-columns: 1fr;
  }
}
