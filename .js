<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI城市特色布丁生成器</title>
    <style>
        body {
            font-family: '微軟正黑體', sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #fdf6f0;
            background-image: linear-gradient(45deg, #fff1e6 25%, transparent 25%, transparent 75%, #fff1e6 75%, #fff1e6), 
                            linear-gradient(45deg, #fff1e6 25%, transparent 25%, transparent 75%, #fff1e6 75%, #fff1e6);
            background-size: 60px 60px;
            background-position: 0 0, 30px 30px;
        }
        .container {
            position: relative;
            overflow: hidden;
            background-color: white;
            padding: 40px;
            border-radius: 20px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
            background: linear-gradient(135deg, #fff 0%, #fff8f5 100%);
        }
        h1 {
            color: #ff6b6b;
            text-align: center;
            margin: 0;
            font-size: 2.5em;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
            background: linear-gradient(45deg, #ff6b6b, #ffa502);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            position: relative;
        }
        .input-group {
            margin-bottom: 20px;
        }
        input[type="text"] {
            width: 100%;
            padding: 10px;
            font-size: 16px;
            border: 2px solid #ffd8d8;
            border-radius: 5px;
            margin-bottom: 10px;
        }
        button {
            width: 100%;
            padding: 12px;
            background-color: #ff6b6b;
            color: white;
            border: none;
            border-radius: 5px;
            font-size: 16px;
            cursor: pointer;
            transition: background-color 0.3s;
        }
        button:hover {
            background-color: #ff5252;
        }
        #result {
            margin-top: 30px;
            padding: 25px;
            border: none;
            border-radius: 15px;
            white-space: pre-wrap;
            display: none;
            background: rgba(255, 214, 214, 0.1);
            box-shadow: 0 0 20px rgba(255, 107, 107, 0.1);
            font-size: 1.1em;
            line-height: 1.6;
            position: relative;
        }
        #result:before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, #ff6b6b, #ffd8d8);
            border-radius: 15px 15px 0 0;
        }
        .loading {
            text-align: center;
            display: none;
            font-size: 1.2em;
            color: #ff6b6b;
            margin: 20px 0;
        }
        .loading:after {
            content: '⏳';
            animation: loading 1s infinite;
        }
        @keyframes loading {
            0% { content: '⌛'; }
            50% { content: '⏳'; }
        }
        .error-message {
            color: #ff6b6b;
            text-align: center;
            padding: 20px;
            background: rgba(255, 107, 107, 0.1);
            border-radius: 10px;
            margin: 10px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🍮 AI城市特色布丁生成器 🍮</h1>
        <div class="input-group">
            <input type="text" id="cityInput" placeholder="請輸入城市名稱（例如：台北、台南、高雄...）">
            <button onclick="generatePudding()">生成特色布丁</button>
        </div>
        <div class="loading" id="loading">正在生成布丁中...</div>
        <div id="result"></div>
    </div>

    <script>
        const GEMINI_API_KEY = 'AIzaSyCK4BvP93-uppDkJJUMeHCud30PGYfn9Ic';

        async function generatePudding() {
            const cityName = document.getElementById('cityInput').value;
            if (!cityName) {
                alert('請輸入城市名稱！');
                return;
            }

            const loading = document.getElementById('loading');
            const result = document.getElementById('result');
            
            loading.style.display = 'block';
            result.style.display = 'none';

            try {
                const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        contents: [{
                            parts: [{                                text: `請以布丁專家的角度，為${cityName}設計一款特色布丁。請包含以下詳細資訊：

                                1. 布丁名稱：請設計一個能體現當地特色的創意名稱

                                2. 主要配料：
                                   - 基底材料：奶類、蛋、糖等基本配料的特色
                                   - 特色食材：至少3種當地特產或代表性食材
                                   - 裝飾配料：搭配的醬汁、水果或其他裝飾

                                3. 口感描述：
                                   - 布丁本體的質地（綿密度、滑嫩度等）
                                   - 各層次的口感變化
                                   - 入口到回韻的味覺體驗

                                4. 特色說明：
                                   - 與當地文化的連結
                                   - 選用特定食材的原因
                                   - 視覺設計的特色
                                   - 適合搭配的場合或時節

                                請用繁體中文回答，以專業美食評論的筆調書寫，並加入感性的描述，讓人能感受到這道布丁的獨特魅力。每個大項目請以「項目：」開頭，小項目可用分段方式說明。`
                            }]
                        }]
                    })
                });

                const data = await response.json();
                if (data.candidates && data.candidates[0].content.parts[0].text) {
                    const puddingDescription = data.candidates[0].content.parts[0].text;
                    result.textContent = puddingDescription;
                    result.style.display = 'block';
                } else {
                    throw new Error('無法生成布丁描述');
                }
            } catch (error) {
                result.textContent = `發生錯誤：${error.message}`;
                result.style.display = 'block';
            } finally {
                loading.style.display = 'none';
            }
        }
    </script>
</body>
</html>
