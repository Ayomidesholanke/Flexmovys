class PricingToggle {
            constructor() {
                this.isYearly = false;
                this.initializeElements();
                this.bindEvents();
            }

            initializeElements() {
                this.toggleSwitch = document.getElementById('toggleSwitch');
                this.monthlyLabel = document.getElementById('monthlyLabel');
                this.yearlyLabel = document.getElementById('yearlyLabel');
                this.discountBanner = document.getElementById('discountBanner');
                this.priceElements = document.querySelectorAll('.price-amount');
            }

            bindEvents() {
                this.toggleSwitch.addEventListener('click', () => this.toggle());
                this.monthlyLabel.addEventListener('click', () => this.setMonthly());
                this.yearlyLabel.addEventListener('click', () => this.setYearly());
            }

            toggle() {
                this.isYearly ? this.setMonthly() : this.setYearly();
            }

            setMonthly() {
                if (!this.isYearly) return;
                
                this.isYearly = false;
                this.updateUI();
            }

            setYearly() {
                if (this.isYearly) return;
                
                this.isYearly = true;
                this.updateUI();
            }

            updateUI() {
                // Update toggle switch
                this.toggleSwitch.classList.toggle('yearly', this.isYearly);
                
                // Update labels
                this.monthlyLabel.classList.toggle('active', !this.isYearly);
                this.yearlyLabel.classList.toggle('active', this.isYearly);
                
                // Update discount banner
                this.discountBanner.classList.toggle('show', this.isYearly);
                
                // Update prices with animation
                this.updatePrices();
            }

            updatePrices() {
                this.priceElements.forEach(priceElement => {
                    const monthlyPrice = priceElement.dataset.monthly;
                    const yearlyPrice = priceElement.dataset.yearly;
                    const newPrice = this.isYearly ? yearlyPrice : monthlyPrice;
                    
                    // Add a subtle animation effect
                    priceElement.style.transform = 'scale(0.95)';
                    priceElement.style.opacity = '0.7';
                    
                    setTimeout(() => {
                        priceElement.textContent = `$${newPrice}`;
                        priceElement.style.transform = 'scale(1)';
                        priceElement.style.opacity = '1';
                    }, 150);
                });
            }
        }

        // Initialize the pricing toggle when the page loads
        document.addEventListener('DOMContentLoaded', () => {
            new PricingToggle();
        });