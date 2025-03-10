        // Modal 功能
        document.addEventListener('DOMContentLoaded', function() {
            const overlay = document.querySelector('.modal-overlay');
            const modals = document.querySelectorAll('.service-modal');
            const featureCards = document.querySelectorAll('.feature-card');
            const experienceBtn = document.getElementById('experienceBtn');
            
            // 顯示體驗 Modal
            if (experienceBtn) {
                experienceBtn.addEventListener('click', async function() {
                    showModal('experience-modal');
                    try {
                        stream = await navigator.mediaDevices.getUserMedia({ video: true });
                        video.srcObject = stream;
                    } catch (err) {
                        console.error('無法存取攝影機:', err);
                        alert('無法存取攝影機，請確認權限設定。');
                    }
                });
            }
            
            // 顯示 Modal
            function showModal(modalId) {
                const modal = document.getElementById(modalId);
                overlay.style.display = 'block';
                modal.style.display = 'block';
                
                setTimeout(() => {
                    overlay.style.opacity = '1';
                    modal.classList.add('active');
                }, 10);
            }
            
            // 關閉 Modal
            function closeModal() {
                overlay.style.opacity = '0';
                modals.forEach(modal => {
                    modal.classList.remove('active');
                });
                
                // 如果是體驗模態視窗，需要關閉攝影機
                if (stream) {
                    stream.getTracks().forEach(track => track.stop());
                    resetCamera();
                }
                
                setTimeout(() => {
                    overlay.style.display = 'none';
                    modals.forEach(modal => {
                        modal.style.display = 'none';
                    });
                }, 300);
            }
            
            // 為每個服務卡片添加點擊事件
            featureCards.forEach((card, index) => {
                card.addEventListener('click', () => {
                    const title = card.querySelector('h3').textContent;
                    let modalId;
                    
                    switch(title) {
                        case '智慧停車系統':
                            modalId = 'smart-parking-modal';
                            break;
                        case '車位管理方案':
                            modalId = 'parking-management-modal';
                            break;
                        case '停車場顧問服務':
                            modalId = 'consultant-service-modal';
                            break;
                    }
                    
                    if (modalId) {
                        showModal(modalId);
                    }
                });
            });
            
            // 關閉按鈕事件
            document.querySelectorAll('.modal-close, .modal-close-btn').forEach(btn => {
                btn.addEventListener('click', closeModal);
            });
            
            // 點擊遮罩層關閉
            overlay.addEventListener('click', closeModal);
            
            // 阻止 Modal 內部點擊事件冒泡
            modals.forEach(modal => {
                modal.addEventListener('click', (e) => {
                    e.stopPropagation();
                });
            });
        });