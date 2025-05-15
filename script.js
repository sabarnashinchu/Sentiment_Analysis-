document.addEventListener('DOMContentLoaded', () => {
    const tweetText = document.getElementById('tweetText');
    const analyzeBtn = document.getElementById('analyzeBtn');
    const scoreElement = document.getElementById('score');
    const sentimentLabel = document.getElementById('sentimentLabel');
    const sentimentEmoji = document.getElementById('sentimentEmoji');
    const positiveWordsList = document.getElementById('positiveWordsList');
    const negativeWordsList = document.getElementById('negativeWordsList');

    // Check if sentiment library is loaded
    if (typeof window.sentiment === 'undefined') {
        console.error('Sentiment library not loaded properly');
        alert('Error: Sentiment analysis library not loaded. Please check your internet connection and refresh the page.');
        return;
    }

    analyzeBtn.addEventListener('click', analyzeSentiment);

    function analyzeSentiment() {
        try {
            const text = tweetText.value.trim();
            
            if (!text) {
                alert('Please enter some text to analyze');
                return;
            }

            // Perform sentiment analysis using the sentiment library
            const result = window.sentiment(text);
            
            // Update score
            scoreElement.textContent = result.score;
            
            // Update sentiment label and emoji
            let label, emoji;
            if (result.score > 0) {
                label = 'Positive';
                emoji = '😊';
            } else if (result.score < 0) {
                label = 'Negative';
                emoji = '😔';
            } else {
                label = 'Neutral';
                emoji = '😐';
            }
            
            sentimentLabel.textContent = label;
            sentimentEmoji.textContent = emoji;

            // Update word lists
            updateWordLists(result.words || [], result.negative || []);

            // Add animation effects
            addAnimationEffects();
        } catch (error) {
            console.error('Error analyzing sentiment:', error);
            alert('An error occurred while analyzing the text. Please try again.');
        }
    }

    function updateWordLists(positiveWords, negativeWords) {
        try {
            // Clear previous lists
            positiveWordsList.innerHTML = '';
            negativeWordsList.innerHTML = '';

            // Add positive words
            if (Array.isArray(positiveWords)) {
                positiveWords.forEach(word => {
                    const li = document.createElement('li');
                    li.textContent = word;
                    positiveWordsList.appendChild(li);
                });
            }

            // Add negative words
            if (Array.isArray(negativeWords)) {
                negativeWords.forEach(word => {
                    const li = document.createElement('li');
                    li.textContent = word;
                    negativeWordsList.appendChild(li);
                });
            }
        } catch (error) {
            console.error('Error updating word lists:', error);
        }
    }

    function addAnimationEffects() {
        try {
            // Add a subtle animation to the score
            scoreElement.style.transform = 'scale(1.1)';
            setTimeout(() => {
                scoreElement.style.transform = 'scale(1)';
            }, 200);

            // Add fade-in effect to the word lists
            const wordItems = document.querySelectorAll('.word-list li');
            wordItems.forEach((item, index) => {
                item.style.opacity = '0';
                item.style.transform = 'translateY(10px)';
                setTimeout(() => {
                    item.style.transition = 'all 0.3s ease';
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, index * 50);
            });
        } catch (error) {
            console.error('Error adding animation effects:', error);
        }
    }

    // Add input event listener for real-time character count
    tweetText.addEventListener('input', () => {
        const text = tweetText.value.trim();
        if (text.length > 280) {
            tweetText.value = text.substring(0, 280);
        }
    });
}); 