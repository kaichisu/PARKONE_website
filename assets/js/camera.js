// 移除重複的模態視窗控制代碼
const video = document.getElementById('videoElement');
const capturedImage = document.getElementById('capturedImage');
const captureBtn = document.getElementById('captureBtn');
const retakeBtn = document.getElementById('retakeBtn');
const enterBtn = document.getElementById('enterBtn');
const exitBtn = document.getElementById('exitBtn');
const licensePlateInput = document.getElementById('licensePlate');
const resultMessage = document.getElementById('resultMessage');




let stream = null;

// 限制車牌輸入格式
licensePlateInput.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/[^A-Za-z0-9-]/g, '').toUpperCase();
});

// 虛擬鍵盤功能
document.querySelectorAll('.keyboard-key').forEach(key => {
    key.addEventListener('click', () => {
        const input = document.getElementById('licensePlate');
        if (key.textContent === '清除') {
            input.value = '';
        } else if (input.value.length < 8) {
            input.value += key.textContent;
        }
    });
});

// 拍攝車牌
captureBtn.onclick = () => {
    const scanningEffect = document.querySelector('.scanning-effect');
    scanningEffect.style.display = 'block';
    
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);
    capturedImage.src = canvas.toDataURL('image/png');
    video.style.display = 'none';
    capturedImage.style.display = 'block';
    captureBtn.style.display = 'none';
    retakeBtn.style.display = 'inline-block';
    
    // 模擬 AI 辨識結果
    setTimeout(() => {
        scanningEffect.style.display = 'none';
        const fakePlate = 'ABC-1234';
        licensePlateInput.value = fakePlate;
        showResult('success', `已成功辨識車牌：${fakePlate}`);
    }, 1500);
}

// 重新拍攝
retakeBtn.onclick = resetCamera;

function resetCamera() {
    video.style.display = 'block';
    capturedImage.style.display = 'none';
    captureBtn.style.display = 'inline-block';
    retakeBtn.style.display = 'none';
    resultMessage.style.display = 'none';
}

// 模擬入場
enterBtn.onclick = () => {
    const plate = licensePlateInput.value;
    if (!plate) {
        showResult('error', '請輸入或拍攝車牌號碼');
        return;
    }
    showResult('success', `車輛 ${plate} 已成功入場！`);
}

// 模擬出場
exitBtn.onclick = () => {
    const plate = licensePlateInput.value;
    if (!plate) {
        showResult('error', '請輸入或拍攝車牌號碼');
        return;
    }
    showResult('success', `車輛 ${plate} 已成功出場！停車費用：60元`);
}

function showResult(type, message) {
    resultMessage.className = `result-message ${type}`;
    resultMessage.textContent = message;
    resultMessage.style.display = 'block';
    resultMessage.classList.add('show');
    
    // 3秒後自動隱藏
    setTimeout(() => {
        resultMessage.classList.remove('show');
        setTimeout(() => {
            resultMessage.style.display = 'none';
        }, 300);
    }, 3000);
}
