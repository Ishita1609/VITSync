function showPage(pageId) {

    document.querySelectorAll('.demo-container').forEach(container => {
        container.style.display = 'none';
    });

    
    document.getElementById(pageId).style.display = 'block';
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === pageId || 
            (link.getAttribute('onclick') && link.getAttribute('onclick').includes(`showPage('${pageId}')`))) {
            link.classList.add('active');
        }
    });

    window.scrollTo(0, 0);
}
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            
            if (this.getAttribute('data-page')) {
                e.preventDefault();
                const pageId = this.getAttribute('data-page');
                showPage(pageId);
            }
        });
    });

    document.querySelectorAll('button[onclick], a[onclick]').forEach(element => {
        const onclickAttr = element.getAttribute('onclick');
        if (onclickAttr && onclickAttr.includes('showPage(')) {
            element.addEventListener('click', function(e) {
            
            });
        }
    });

    
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
           
            let isValid = true;
            const requiredFields = form.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('is-invalid');
                } else {
                    field.classList.remove('is-invalid');
                }
            });
            
            if (isValid) {
                const submitBtn = form.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Processing...';
                
                setTimeout(() => {
                    submitBtn.innerHTML = '<i class="bi bi-check-circle"></i> Success!';
                    form.reset();
                    
                    setTimeout(() => {
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = originalText;
                    }, 2000);
                }, 1500);
            }
        });
    });

    const freeItemCheckbox = document.getElementById('freeItem');
    if (freeItemCheckbox) {
        freeItemCheckbox.addEventListener('change', function() {
            const priceInput = document.querySelector('input[name="price"]');
            if (priceInput) {
                if (this.checked) {
                    priceInput.value = '0';
                    priceInput.disabled = true;
                } else {
                    priceInput.value = '';
                    priceInput.disabled = false;
                }
            }
        });
    }

    const filterForm = document.querySelector('#marketplace form');
    if (filterForm) {
        filterForm.addEventListener('submit', function(e) {
            e.preventDefault();
 
            const submitBtn = filterForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Filtering...';
            
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }, 1000);
        });
    }
    showPage('home');
});