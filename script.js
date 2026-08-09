/* =====================================================
   TYPING EFFECT
====================================================== */

const introText =
    "I'm a Computer Science Engineering student, developer and technology enthusiast.";

let typingIndex = 0;


function typeIntroduction() {

    const textElement =
        document.getElementById("typingText");


    if (
        textElement &&
        typingIndex < introText.length
    ) {

        textElement.textContent +=
            introText.charAt(typingIndex);

        typingIndex++;


        setTimeout(
            typeIntroduction,
            35
        );

    }

}


window.addEventListener(
    "load",
    function () {

        typeIntroduction();

        window.speechSynthesis.getVoices();

    }
);



/* =====================================================
   GET MALE VOICE
====================================================== */

function getMaleVoice() {

    const voices =
        window.speechSynthesis.getVoices();


    console.log(
        "Available voices:"
    );


    voices.forEach(
        function (voice) {

            console.log(
                voice.name,
                "-",
                voice.lang
            );

        }
    );


    let maleVoice =
        voices.find(
            function (voice) {

                return (
                    voice.lang
                        .toLowerCase()
                        .startsWith("en-in") &&

                    /male|ravi|hemant|rishi|prabhat/i
                        .test(voice.name)
                );

            }
        );


    if (!maleVoice) {

        maleVoice =
            voices.find(
                function (voice) {

                    return (
                        /en-us|en-gb|en-au|en-ca|en-in/i
                            .test(voice.lang) &&

                        /male|david|mark|daniel|alex|george|guy|ryan/i
                            .test(voice.name)
                    );

                }
            );

    }


    if (!maleVoice) {

        maleVoice =
            voices.find(
                function (voice) {

                    return (
                        /Microsoft.*David/i
                            .test(voice.name) ||

                        /Microsoft.*Mark/i
                            .test(voice.name) ||

                        /Microsoft.*Guy/i
                            .test(voice.name) ||

                        /Microsoft.*Ryan/i
                            .test(voice.name)
                    );

                }
            );

    }


    return maleVoice;
}



/* =====================================================
   AI INTRODUCTION
====================================================== */

function startAIIntroduction() {


    if (
        !("speechSynthesis" in window)
    ) {

        alert(
            "Your browser does not support AI voice."
        );

        return;

    }


    window.speechSynthesis.cancel();


    const introduction =

        "Hello. Welcome to my portfolio. " +

        "I am Venkata Narayana P. " +

        "I am a Computer Science Engineering student " +

        "and a technology enthusiast. " +

        "I am passionate about programming, " +

        "software development and building real world projects. " +

        "I am developing my skills in Java, Python, " +

        "HTML, CSS, JavaScript and SQL. " +

        "I enjoy learning new technologies " +

        "and solving problems through technology. " +

        "You can explore my skills and projects " +

        "through this portfolio. " +

        "You can also connect with me through my GitHub, " +

        "email or phone. " +

        "Thank you for visiting my portfolio.";


    const speech =
        new SpeechSynthesisUtterance(
            introduction
        );


    speech.rate = 0.82;

    speech.pitch = 0.65;

    speech.volume = 1;

    speech.lang = "en-IN";


    const maleVoice =
        getMaleVoice();


    if (maleVoice) {

        speech.voice =
            maleVoice;

        speech.lang =
            maleVoice.lang;

        console.log(
            "Selected male voice:",
            maleVoice.name
        );

    }


    const introScreen =
        document.getElementById(
            "introScreen"
        );


    const voiceButton =
        document.getElementById(
            "voiceButton"
        );


    introScreen.classList.add(
        "ai-active"
    );


    voiceButton.textContent =
        "🔊 AI MALE VOICE SPEAKING...";


    voiceButton.disabled = true;


    speech.onend =
        function () {

            introScreen.classList.remove(
                "ai-active"
            );


            voiceButton.disabled =
                false;


            voiceButton.textContent =
                "🔊 PLAY MALE INTRO AGAIN";

        };


    speech.onerror =
        function (event) {

            console.log(
                "Speech error:",
                event.error
            );


            introScreen.classList.remove(
                "ai-active"
            );


            voiceButton.disabled =
                false;


            voiceButton.textContent =
                "🔊 TRY AGAIN";

        };


    window.speechSynthesis.speak(
        speech
    );

}



/* =====================================================
   ENTER PORTFOLIO
====================================================== */

function enterPortfolio() {

    const introScreen =
        document.getElementById(
            "introScreen"
        );


    const portfolio =
        document.getElementById(
            "portfolio"
        );


    window.speechSynthesis.cancel();


    introScreen.style.opacity =
        "0";


    setTimeout(
        function () {

            introScreen.style.display =
                "none";


            portfolio.classList.remove(
                "hidden"
            );


            window.scrollTo(
                0,
                0
            );

        },
        1200
    );

}
