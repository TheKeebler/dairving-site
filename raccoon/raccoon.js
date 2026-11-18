        let currentPosts = [];
        let usedIndices = [];
        let preloadedImages = new Map();

        async function loadMemesFromJSON() {
            try {
                const response = await fetch('./memes.json');
                currentPosts = await response.json();
                displayRandomMeme();
            } catch (error) {
                console.error('Error loading memes:', error);
                document.getElementById('memeContainer').innerHTML = `
                    <div class="error">
                        <h3>🦝 Oops! Couldn't load the memes</h3>
                        <p>Make sure memes.json is in the same folder as index.html</p>
                    </div>
                `;
            }
        }

        function preloadNextMemes(count = 3) {
            const memesToPreload = [];
            let tempUsedIndices = [...usedIndices];
            
            for (let i = 0; i < count; i++) {
                if (tempUsedIndices.length >= currentPosts.length) {
                    tempUsedIndices = [];
                }
                
                let randomIndex;
                do {
                    randomIndex = Math.floor(Math.random() * currentPosts.length);
                } while (tempUsedIndices.includes(randomIndex));
                
                tempUsedIndices.push(randomIndex);
                memesToPreload.push(currentPosts[randomIndex]);
            }
            
            memesToPreload.forEach(meme => {
                if (!preloadedImages.has(meme.url)) {
                    const img = new Image();
                    img.src = meme.url;
                    preloadedImages.set(meme.url, img);
                }
            });
        }

        function displayRandomMeme() {
            if (usedIndices.length >= currentPosts.length) {
                usedIndices = [];
            }

            let randomIndex;
            do {
                randomIndex = Math.floor(Math.random() * currentPosts.length);
            } while (usedIndices.includes(randomIndex));

            usedIndices.push(randomIndex);
            const post = currentPosts[randomIndex];

            document.getElementById('memeContainer').innerHTML = `
                <h2 class="meme-title">${escapeHtml(post.title)}</h2>
                <div class="meme-image-wrapper">
                    <img src="${post.url}" alt="${escapeHtml(post.title)}" class="meme-image">
                </div>
            `;
            const memeImg = document.querySelector('#memeContainer .meme-image');
            memeImg.addEventListener('error', function () {
                document.getElementById('memeContainer').innerHTML = '<div class="error">Image failed to load. Click New Meme to try another!</div>';
            });
            
            preloadNextMemes(3);
        }

        function loadNewMeme() {
            const btn = document.getElementById('newMemeBtn');
            btn.disabled = true;
            displayRandomMeme();
            btn.disabled = false;
        }

        document.getElementById('secretRaccoon').addEventListener('click', function() {
            window.location.href = './video.html';
        });

        function escapeHtml(text) {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        }

        document.getElementById('newMemeBtn').addEventListener('click', loadNewMeme);
        loadMemesFromJSON();
    
