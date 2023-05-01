var workTime = 25 * 60 * 1000; // 25 minutes in milliseconds
        var breakTime = 5 * 60 * 1000; // 5 minutes in milliseconds
        var timerId;
        var startTime;
        var remainingTime = workTime;
        var isRunning = false;
        var isBreak = false;

        function startTimer() {
            if (!isRunning) {
                isRunning = true;
                startTime = Date.now();
                timerId = setInterval(updateTimer, 1000);
            }
        }

        function stopTimer() {
            if (isRunning) {
                isRunning = false;
                clearInterval(timerId);
                remainingTime -= Date.now() - startTime;
            }
        }

        function resetTimer() {
            stopTimer();
            remainingTime = workTime;
            isBreak = false;
            updateDisplay();
        }

        function updateTimer() {
            var elapsed = Date.now() - startTime;
            remainingTime = isBreak ? breakTime - elapsed : workTime - elapsed;
            if (remainingTime <= 0) {
                if (isBreak) {
                    remainingTime = workTime;
                    isBreak = false;
                } else {
                    remainingTime = breakTime;
                    isBreak = true;
                }
                startTime = Date.now();
            }
            updateDisplay();
        }

        function updateDisplay() {
            var minutes = Math.floor(remainingTime / 60000);
            var seconds = Math.floor((remainingTime % 60000) / 1000);
            var display = document.getElementById("display");
            display.innerHTML = zeroPad(minutes) + ":" + zeroPad(seconds);
        }

        function zeroPad(num) {
            return (num < 10 ? "0" : "") + num;
        }