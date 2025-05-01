// Página de productos
document.addEventListener('DOMContentLoaded', function() {
    // Datos de ejemplo para productos
    const productos = [
        {
            id: 1,
            nombre: "Filtro de Aceite Premium",
            descripcion: "Compatible con múltiples marcas y modelos",
            precio: 19.99,
            categoria: "motor",
            marca: "bosch",
            imagen: "producto1.jpg",
            oferta: true
        },
        {
            id: 2,
            nombre: "Pastillas de Freno Cerámicas",
            descripcion: "Mayor durabilidad y rendimiento",
            precio: 45.99,
            categoria: "frenos",
            marca: "gates",
            imagen: "producto2.jpg",
            oferta: false
        },
        {
            id: 3,
            nombre: "Batería de Alto Rendimiento",
            descripcion: "Garantía de 3 años, libre de mantenimiento",
            precio: 89.99,
            categoria: "electrico",
            marca: "bosch",
            imagen: "producto3.jpg",
            oferta: false
        },
        {
            id: 4,
            nombre: "Aceite Sintético 5W-30",
            descripcion: "Protección superior para tu motor",
            precio: 32.50,
            categoria: "motor",
            marca: "gates",
            imagen: "producto4.jpg",
            oferta: false
        },
        {
            id: 5,
            nombre: "Amortiguadores Delanteros",
            descripcion: "Mejora la estabilidad y el confort",
            precio: 78.50,
            categoria: "suspension",
            marca: "monroe",
            imagen: "producto5.jpg",
            oferta: true
        },
        {
            id: 6,
            nombre: "Bujías de Iridio",
            descripcion: "Mayor eficiencia y ahorro de combustible",
            precio: 12.99,
            categoria: "motor",
            marca: "ngk",
            imagen: "producto6.jpg",
            oferta: false
        },
        {
            id: 7,
            nombre: "Kit de Distribución",
            descripcion: "Incluye bomba de agua y tensor",
            precio: 120.00,
            categoria: "motor",
            marca: "gates",
            imagen: "producto7.jpg",
            oferta: true
        },
        {
            id: 8,
            nombre: "Discos de Freno Ventilados",
            descripcion: "Mayor disipación de calor y frenado",
            precio: 65.75,
            categoria: "frenos",
            marca: "bosch",
            imagen: "producto8.jpg",
            oferta: false
        },
        // Generar más productos para tener suficientes
        ...Array.from({ length: 16 }, (_, i) => ({
            id: i + 9,
            nombre: `Producto ${i + 9}`,
            descripcion: "Descripción del producto",
            precio: Math.floor(Math.random() * 100) + 10,
            categoria: ["motor", "frenos", "suspension", "electrico", "accesorios"][Math.floor(Math.random() * 5)],
            marca: ["bosch", "gates", "monroe", "ngk"][Math.floor(Math.random() * 4)],
            imagen: `producto${(i % 8) + 1}.jpg`,
            oferta: Math.random() > 0.8
        }))
    ];
    
    // Variables para paginación
    let currentPage = 1;
    const productsPerPage = 8;
    let filteredProducts = [...productos];
    
    // Elementos DOM
    const productsContainer = document.getElementById('products-container');
    const productCount = document.getElementById('product-count');
    const prevPageBtn = document.getElementById('prev-page');
    const nextPageBtn = document.getElementById('next-page');
    const pageNumbers = document.getElementById('page-numbers');
    const priceRange = document.getElementById('price-range');
    const priceValue = document.getElementById('price-value');
    const applyFiltersBtn = document.getElementById('apply-filters');
    const sortBy = document.getElementById('sort-by');
    
    // Mostrar productos en la página actual
    function displayProducts() {
        if (!productsContainer) return;
        
        const startIndex = (currentPage - 1) * productsPerPage;
        const endIndex = startIndex + productsPerPage;
        const currentProducts = filteredProducts.slice(startIndex, endIndex);
        
        productsContainer.innerHTML = '';
        
        if (currentProducts.length === 0) {
            productsContainer.innerHTML = '<p class="no-products">No se encontraron productos que coincidan con los filtros seleccionados.</p>';
            return;
        }
        
        currentProducts.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            
            productCard.innerHTML = `
                <div class="product-image">
                    <img src="img/${product.imagen}" alt="${product.nombre}">
                    ${product.oferta ? '<div class="product-tag">Oferta</div>' : ''}
                </div>
                <div class="product-info">
                    <h3>${product.nombre}</h3>
                    <p class="product-description">${product.descripcion}</p>
                    <div class="product-price">
                        <span class="price-current">$${product.precio.toFixed(2)}</span>
                    </div>
                    <button class="add-to-cart" data-id="${product.id}" data-name="${product.nombre}" data-price="${product.precio}">
                        Añadir al Carrito
                    </button>
                </div>
            `;
            
            productsContainer.appendChild(productCard);
        });
        
        // Actualizar contadores y botones de paginación
        if (productCount) {
            productCount.textContent = filteredProducts.length;
        }
        
        updatePagination();
        
        // Agregar event listeners a los nuevos botones
        const addToCartButtons = productsContainer.querySelectorAll('.add-to-cart');
        addToCartButtons.forEach(button => {
            button.addEventListener('click', function() {
                const id = this.dataset.id;
                const name = this.dataset.name;
                const price = parseFloat(this.dataset.price);
                
                // Usar la función addToCart del archivo cart.js
                const cart = JSON.parse(localStorage.getItem('cart')) || [];
                const existingItem = cart.find(item => item.id === id);
                
                if (existingItem) {
                    existingItem.quantity++;
                } else {
                    cart.push({
                        id,
                        name,
                        price,
                        quantity: 1
                    });
                }
                
                localStorage.setItem('cart', JSON.stringify(cart));
                
                // Actualizar contador del carrito
                const cartCount = document.querySelector('.cart-count');
                if (cartCount) {
                    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
                    cartCount.textContent = totalItems;
                }
                
                // Mostrar mensaje de confirmación
                const message = document.createElement('div');
                message.classList.add('add-to-cart-message');
                message.textContent = '¡Producto agregado al carrito!';
                document.body.appendChild(message);
                
                setTimeout(() => {
                    message.classList.add('show');
                }, 100);
                
                setTimeout(() => {
                    message.classList.remove('show');
                    setTimeout(() => {
                        document.body.removeChild(message);
                    }, 300);
                }, 2000);
            });
        });
    }
    
    // Actualizar paginación
    function updatePagination() {
        if (!pageNumbers || !prevPageBtn || !nextPageBtn) return;
        
        const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
        
        // Actualizar botones de anterior y siguiente
        prevPageBtn.disabled = currentPage === 1;
        nextPageBtn.disabled = currentPage === totalPages;
        
        // Actualizar números de página
        pageNumbers.innerHTML = '';
        
        // Mostrar máximo 5 números de página
        const startPage = Math.max(1, currentPage - 2);
        const endPage = Math.min(totalPages, startPage + 4);
        
        for (let i = startPage; i <= endPage; i++) {
            const pageButton = document.createElement('button');
            pageButton.classList.add('page-number');
            if (i === currentPage) {
                pageButton.classList.add('active');
            }
            pageButton.textContent = i;
            pageButton.addEventListener('click', function() {
                currentPage = i;
                displayProducts();
                window.scrollTo(0, 0);
            });
            pageNumbers.appendChild(pageButton);
        }
    }
    
    // Aplicar filtros
    function applyFilters() {
        // Obtener valores de los filtros
        const selectedCategories = [];
        const categoryCheckboxes = document.querySelectorAll('#category-filters input[type="checkbox"]:checked');
        categoryCheckboxes.forEach(checkbox => {
            if (checkbox.value !== 'all') {
                selectedCategories.push(checkbox.value);
            }
        });
        
        const selectedBrands = [];
        const brandCheckboxes = document.querySelectorAll('#brand-filters input[type="checkbox"]:checked');
        brandCheckboxes.forEach(checkbox => {
            if (checkbox.value !== 'all') {
                selectedBrands.push(checkbox.value);
            }
        });
        
        const maxPrice = parseInt(priceRange.value);
        
        // Filtrar productos
        filteredProducts = productos.filter(product => {
            // Filtrar por categoría
            if (selectedCategories.length > 0 && !selectedCategories.includes(product.categoria)) {
                return false;
            }
            
            // Filtrar por marca
            if (selectedBrands.length > 0 && !selectedBrands.includes(product.marca)) {
                return false;
            }
            
            // Filtrar por precio
            if (product.precio > maxPrice) {
                return false;
            }
            
            return true;
        });
        
        // Ordenar productos
        const sortValue = sortBy.value;
        switch (sortValue) {
            case 'price-low':
                filteredProducts.sort((a, b) => a.precio - b.precio);
                break;
            case 'price-high':
                filteredProducts.sort((a, b) => b.precio - a.precio);
                break;
            case 'name-asc':
                filteredProducts.sort((a, b) => a.nombre.localeCompare(b.nombre));
                break;
            case 'name-desc':
                filteredProducts.sort((a, b) => b.nombre.localeCompare(a.nombre));
                break;
            default:
                // Por defecto, ordenar por relevancia (no hacer nada)
                break;
        }
        
        // Resetear a la primera página
        currentPage = 1;
        displayProducts();
    }
    
    // Event listeners
    if (prevPageBtn) {
        prevPageBtn.addEventListener('click', function() {
            if (currentPage > 1) {
                currentPage--;
                displayProducts();
                window.scrollTo(0, 0);
            }
        });
    }
    
    if (nextPageBtn) {
        nextPageBtn.addEventListener('click', function() {
            const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
            if (currentPage < totalPages) {
                currentPage++;
                displayProducts();
                window.scrollTo(0, 0);
            }
        });
    }
    
    if (priceRange && priceValue) {
        priceRange.addEventListener('input', function() {
            priceValue.textContent = `$${this.value}`;
        });
    }
    
    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', applyFilters);
    }
    
    if (sortBy) {
        sortBy.addEventListener('change', applyFilters);
    }
    
    // Checkbox "Todos" para categorías
    const catAllCheckbox = document.getElementById('cat-all');
    const categoryCheckboxes = document.querySelectorAll('#category-filters input[type="checkbox"]:not(#cat-all)');
    
    if (catAllCheckbox && categoryCheckboxes.length > 0) {
        catAllCheckbox.addEventListener('change', function() {
            categoryCheckboxes.forEach(checkbox => {
                checkbox.checked = false;
                checkbox.disabled = this.checked;
            });
        });
        
        categoryCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                if (this.checked) {
                    catAllCheckbox.checked = false;
                }
                
                // Si no hay ninguna categoría seleccionada, seleccionar "Todos"
                const anyChecked = Array.from(categoryCheckboxes).some(cb => cb.checked);
                if (!anyChecked) {
                    catAllCheckbox.checked = true;
                }
            });
        });
    }
    
    // Checkbox "Todos" para marcas
    const brandAllCheckbox = document.getElementById('brand-all');
    const brandCheckboxes = document.querySelectorAll('#brand-filters input[type="checkbox"]:not(#brand-all)');
    
    if (brandAllCheckbox && brandCheckboxes.length > 0) {
        brandAllCheckbox.addEventListener('change', function() {
            brandCheckboxes.forEach(checkbox => {
                checkbox.checked = false;
                checkbox.disabled = this.checked;
            });
        });
        
        brandCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                if (this.checked) {
                    brandAllCheckbox.checked = false;
                }
                
                // Si no hay ninguna marca seleccionada, seleccionar "Todos"
                const anyChecked = Array.from(brandCheckboxes).some(cb => cb.checked);
                if (!anyChecked) {
                    brandAllCheckbox.checked = true;
                }
            });
        });
    }
    
    // Inicializar la página
    displayProducts();
    
    // Verificar si hay parámetros en la URL para filtrar
    const urlParams = new URLSearchParams(window.location.search);
    const categoriaParam = urlParams.get('categoria');
    
    if (categoriaParam) {
        const categoriaCheckbox = document.getElementById(`cat-${categoriaParam}`);
        if (categoriaCheckbox) {
            catAllCheckbox.checked = false;
            categoriaCheckbox.checked = true;
            categoryCheckboxes.forEach(checkbox => {
                checkbox.disabled = false;
            });
            applyFilters();
        }
    }
});