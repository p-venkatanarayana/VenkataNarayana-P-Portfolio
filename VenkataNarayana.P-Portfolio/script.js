/* =====================================
   TYPING EFFECT
===================================== */

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

        /*
         Load browser voices.
         Some browsers load voices
         asynchronously.
        */

        window.speechSynthesis.getVoices();

    }
);



/* =====================================
   GET MALE VOICE
===================================== */

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


    /*
       First preference:
       Indian English male voices
    */

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


    /*
       Second preference:
       Any English male voice
    */

    if (!maleVoice) {

        maleVoice =
            voices.find(
                function (voice) {

                    return (
                        /en-us|en-gb|en-au|en-ca|en-in/i
                            .test(voice.lang) &&

                        /male|david|mark|daniel|alex|george/i
                            .test(voice.name)
                    );

                }
            );

    }


    /*
       Third preference:
       Try known male-sounding
       Microsoft voices.
    */

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



/* =====================================
   AI VOICE INTRODUCTION
===================================== */

function startAIIntroduction() {

    /*
       Browser support check
    */

    if (
        !("speechSynthesis" in window)
    ) {

        alert(
            "Your browser does not support AI voice."
        );

        return;

    }


    /*
       Stop previous speech
    */

    window.speechSynthesis.cancel();


    /*
       Introduction
    */

    const introduction =

        "Hello. Welcome to my portfolio. " +

        "I am Venkata Narayana P. " +

        "I am a Computer Science Engineering student. " +

        "I am passionate about programming, technology, " +

        "software development and building real world projects. " +

        "I am currently developing my skills in Java, Python, " +

        "web development and software development. " +

        "I enjoy learning new technologies and creating useful projects. " +

        "Thank you for visiting my portfolio. " +

        "Let me show you my work.";


    /*
       Create speech
    */

    const speech =
        new SpeechSynthesisUtterance(
            introduction
        );


    /*
       Voice settings
    */

    speech.rate = 0.82;

    speech.pitch = 0.65;

    speech.volume = 1;

    speech.lang = "en-IN";


    /*
       Find male voice
    */

    const maleVoice =
        getMaleVoice();


    if (maleVoice) {

        speech.voice =
            maleVoice;

        speech.lang =
            maleVoice.lang;

        console.log(
            "SELECTED MALE VOICE:",
            maleVoice.name,
            maleVoice.lang
        );

    } else {

        /*
           If browser doesn't have
           male voice, use English
           voice with deeper pitch.
        */

        console.log(
            "No male voice found in browser."
        );

    }


    /*
       AI animation
    */

    const introScreen =
        document.getElementById(
            "introScreen"
        );


    introScreen.classList.add(
        "ai-active"
    );


    /*
       Button
    */

    const voiceButton =
        document.getElementById(
            "voiceButton"
        );


    voiceButton.textContent =
        "🔊 AI MALE VOICE SPEAKING...";


    voiceButton.disabled = true;


    /*
       Voice started
    */

    speech.onstart =
        function () {

            console.log(
                "Male AI voice started."
            );

        };


    /*
       Voice finished
    */

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


    /*
       Error
    */

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


    /*
       Start speaking
    */

    window.speechSynthesis.speak(
        speech
    );

}



/* =====================================
   ENTER PORTFOLIO
===================================== */

function enterPortfolio() {

    const introScreen =
        document.getElementById(
            "introScreen"
        );


    const portfolio =
        document.getElementById(
            "portfolio"
        );


    /*
       Stop voice when leaving intro
    */

    window.speechSynthesis.cancel();


    /*
       Fade intro
    */

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