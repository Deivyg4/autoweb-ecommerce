// Funcionalidad para la página de ofertas
document.addEventListener('DOMContentLoaded', function() {
    // Configurar el contador de tiempo
    const countdownDate = new Date();
    countdownDate.setDate(countdownDate.getDate() + 3); // 3 días desde hoy
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = countdownDate - now;
        
        // Cálculos de tiempo
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Actualizar elementos del DOM
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        
        // Si el contador llega a cero
        if (distance < 0) {
            clearInterval(countdownTimer);
            document.getElementById('countdown').innerHTML = "<p>¡La oferta ha expirado!</p>";
        }
    }
    
    // Actualizar el contador cada segundo
    updateCountdown();
    const countdownTimer = setInterval(updateCountdown, 1000);
    
    // Datos de productos en oferta
    const productosOferta = [
        {
            id: 1,
            nombre: "Filtro de Aceite Premium",
            descripcion: "Compatible con múltiples marcas y modelos",
            precioOriginal: 25.99,
            precioOferta: 19.99,
            descuento: 30,
            categoria: "motor",
            imagen: "producto1.jpg"
        },
        {
            id: 5,
            nombre: "Amortiguadores Delanteros",
            descripcion: "Mejora la estabilidad y el confort",
            precioOriginal: 105.00,
            precioOferta: 78.50,
            descuento: 25,
            categoria: "suspension",
            imagen: "producto5.jpg"
        },
        {
            id: 7,
            nombre: "Kit de Distribución",
            descripcion: "Incluye bomba de agua y tensor",
            precioOriginal: 150.00,
            precioOferta: 120.00,
            descuento: 20,
            categoria: "motor",
            imagen: "producto7.jpg"
        },
        {
            id: 9,
            nombre: "Bujías de Platino",
            descripcion: "Mayor rendimiento y durabilidad",
            precioOriginal: 18.99,
            precioOferta: 14.99,
            descuento: 21,
            categoria: "motor",
            imagen: "producto6.jpg"
        },
        {
            id: 10,
            nombre: "Aceite Sintético 10W-40",
            descripcion: "Protección superior para motores de alto rendimiento",
            precioOriginal: 45.99,
            precioOferta: 36.79,
            descuento: 20,
            categoria: "motor",
            imagen: "producto4.jpg"
        },
        {
            id: 11,
            nombre: "Pastillas de Freno Deportivas",
            descripcion: "Mayor potencia de frenado y resistencia al calor",
            precioOriginal: 89.99,
            precioOferta: 62.99,
            descuento: 30,
            categoria: "frenos",
            imagen: "producto2.jpg"
        },
        {
            id: 12,
            nombre: "Alternador Remanufacturado",
            descripcion: "Garantía de 1 año, compatible con varios modelos",
            precioOriginal: 199.99,
            precioOferta: 139.99,
            descuento: 30,
            categoria: "electrico",
            imagen: "producto3.jpg"
        },
        {
            id: 13,
            nombre: "Kit de Embrague",
            descripcion: "Incluye disco, plato y rodamiento",
            precioOriginal: 250.00,
            precioOferta: 187.50,
            descuento: 25,
            categoria: "motor",
            imagen: "producto7.jpg"
        },
        {
            id: 14,
            nombre: "Radiador de Aluminio",
            descripcion: "Mayor eficiencia en la disipación de calor",
            precioOriginal: 180.00,
            precioOferta: 144.00,
            descuento: 20,
            categoria: "motor",
            imagen: "producto8.jpg"
        },
        {
            id: 15,
            nombre: "Faros LED",
            descripcion: "Mayor visibilidad y menor consumo",
            precioOriginal: 120.00,
            precioOferta: 84.00,
            descuento: 30,
            categoria: "electrico",
            imagen: "producto3.jpg"
        },
        {
            id: 16,
            nombre: "Bomba de Agua",
            descripcion: "Alta durabilidad y rendimiento",
            precioOriginal: 65.00,
            precioOferta: 48.75,
            descuento: 25,
            categoria: "motor",
            imagen: "producto1.jpg"
        },
        {
            id: 17,
            nombre: "Discos de Freno Perforados",
            descripcion: "Mejor disipación de calor y rendimiento",
            precioOriginal: 110.00,
            precioOferta: 77.00,
            descuento: 30,
            categoria: "frenos",
            imagen: "producto8.jpg"
        },
        {
            id: 18,
            nombre: "Sensor de Oxígeno",
            descripcion: "Mejora el rendimiento y reduce el consumo",
            precioOriginal: 85.00,
            precioOferta: 59.50,
            descuento: 30,
            categoria: "electrico",
            imagen: "producto6.jpg"
        }
    ];
    
    // Variables para paginación
    let currentPage = 1;
    const productsPerPage = 8;
    let filteredProducts = [...productosOferta];
    
    // Elementos DOM
    const ofertasContainer = document.getElementById('ofertas-container');
    const prevPageBtn = document.getElementById('prev-page');
    const nextPageBtn = document.getElementById('next-page');
    const pageNumbers = document.getElementById('page-numbers');
    const filtroCategoria = document.getElementById('filtro-categoria');
    const filtroDescuento = document.getElementById('filtro-descuento');
    const filtroOrden = document.getElementById('filtro-orden');
    
    // Mostrar productos en oferta
    function displayProducts() {
        if (!ofertasContainer) return;
        
        const startIndex = (currentPage - 1) * productsPerPage;
        const endIndex = startIndex + productsPerPage;
        const currentProducts = filteredProducts.slice(startIndex, endIndex);
        
        ofertasContainer.innerHTML = '';
        
        if (currentProducts.length === 0) {
            ofertasContainer.innerHTML = '<p class="no-products">No se encontraron productos en oferta que coincidan con los filtros seleccionados.</p>';
            return;
        }
        
        currentProducts.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            
            productCard.innerHTML = `
                <div class="product-image">
                    <img src="img/${product.imagen}" alt="${product.nombre}">
                    <div class="product-tag">-${product.descuento}%</div>
                </div>
                <div class="product-info">
                    <h3>${product.nombre}</h3>
                    <p class="product-description">${product.descripcion}</p>
                    <div class="product-price">
                        <span class="price-old">$${product.precioOriginal.toFixed(2)}</span>
                        <span class="price-current">$${product.precioOferta.toFixed(2)}</span>
                    </div>
                    <button class="add-to-cart" data-id="${product.id}" data-name="${product.nombre}" data-price="${product.precioOferta}">
                        Añadir al Carrito
                    </button>
                </div>
            `;
            
            ofertasContainer.appendChild(productCard);
        });
        
        // Actualizar paginación
        updatePagination();
        
        // Agregar event listeners a los nuevos botones
        const addToCartButtons = ofertasContainer.querySelectorAll('.add-to-cart');
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
        const categoriaSeleccionada = filtroCategoria.value;
        const descuentoMinimo = parseInt(filtroDescuento.value) || 0;
        const ordenSeleccionado = filtroOrden.value;
        
        // Filtrar productos
        filteredProducts = productosOferta.filter(product => {
            // Filtrar por categoría
            if (categoriaSeleccionada !== 'todas' && product.categoria !== categoriaSeleccionada) {
                return false;
            }
            
            // Filtrar por descuento mínimo
            if (product.descuento < descuentoMinimo) {
                return false;
            }
            
            return true;
        });
        
        // Ordenar productos
        switch (ordenSeleccionado) {
            case 'descuento':
                filteredProducts.sort((a, b) => b.descuento - a.descuento);
                break;
            case 'precio-bajo':
                filteredProducts.sort((a, b) => a.precioOferta - b.precioOferta);
                break;
            case 'precio-alto':
                filteredProducts.sort((a, b) => b.precioOferta - a.precioOferta);
                break;
            case 'nombre':
                filteredProducts.sort((a, b) => a.nombre.localeCompare(b.nombre));
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
    
    if (filtroCategoria) {
        filtroCategoria.addEventListener('change', applyFilters);
    }
    
    if (filtroDescuento) {
        filtroDescuento.addEventListener('change', applyFilters);
    }
    
    if (filtroOrden) {
        filtroOrden.addEventListener('change', applyFilters);
    }
    
    // Inicializar la página
    displayProducts();
    
    // Agregar estilos para el mensaje de "Añadido al carrito"
    const style = document.createElement('style');
    style.textContent = `
        .add-to-cart-message {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: var(--primary-color);
            color: white;
            padding: 12px 20px;
            border-radius: 4px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
            z-index: 1000;
            transform: translateY(100px);
            opacity: 0;
            transition: all 0.3s ease;
        }
        
        .add-to-cart-message.show {
            transform: translateY(0);
            opacity: 1;
        }
    `;
    document.head.appendChild(style);
});