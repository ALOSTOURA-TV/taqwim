    $(document).ready(function () {
        // تهيئة Swiper لعرض شرائح Intro
        var introswiper = new Swiper(".introswiper", {
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            pagination: {
                el: ".swiper-pagination",
            },
        });
        introswiper.on('reachEnd', function () {
            introswiper.autoplay = false;
            setTimeout(function () {
                window.location.replace("signin.html");
            }, 5000);
        });

        // إذا كانت الصفحة هي الصفحة الرئيسية (Index)، يتم تنفيذ عدة وظائف
        if (document.body.getAttribute('data-page') === "index") {
            // إخفاء العناصر بعد انتهاء شريط التقدم
            $('.hideonprogressbar').each(function () {
                var thisEl = $(this);
                var hidelment = "." + thisEl.attr('data-target');
                var widthprogress = 1;

                var interval = setInterval(function () {
                    widthprogress++;
                    if (widthprogress > 0 && widthprogress < 100) {
                        thisEl.find('.progress-bar').css('width', widthprogress + "%");
                    } else if (widthprogress === 100) {
                        $(hidelment).fadeOut();
                        clearInterval(interval); // إيقاف التكرار بعد الوصول إلى 100%
                    }
                }, 75);
            });

            // تهيئة دوائر التقدم (Progress Circles)
            var progressCircles1 = new ProgressBar.Circle('#circleprogressone', {
                color: '#7297F8',
                strokeWidth: 10,
                trailWidth: 10,
                easing: 'easeInOut',
                trailColor: '#d8e0f9',
                duration: 1400,
                text: {
                    autoStyleContainer: false
                },
                from: { color: '#7297F8', width: 10 },
                to: { color: '#7297F8', width: 10 },
                step: function (state, circle) {
                    circle.path.setAttribute('stroke', state.color);
                    circle.path.setAttribute('stroke-width', state.width);

                    var value = Math.round(circle.value() * 100);
                    if (value === 0) {
                        // circle.setText('');
                    } else {
                        //  circle.setText(value + "<small>%<small>");
                    }
                }
            });
            progressCircles1.animate(0.65);  // تعيين قيمة التقدم إلى 65%

            var progressCircles2 = new ProgressBar.Circle('#circleprogresstwo', {
                color: '#3AC79B',
                strokeWidth: 10,
                trailWidth: 10,
                easing: 'easeInOut',
                trailColor: '#d8f4eb',
                duration: 1400,
                text: {
                    autoStyleContainer: false
                },
                from: { color: '#3AC79B', width: 10 },
                to: { color: '#3AC79B', width: 10 },
                step: function (state, circle) {
                    circle.path.setAttribute('stroke', state.color);
                    circle.path.setAttribute('stroke-width', state.width);

                    var value = Math.round(circle.value() * 100);
                    if (value === 0) {
                        //  circle.setText('');
                    } else {
                        // circle.setText(value + "<small>%<small>");
                    }
                }
            });
            progressCircles2.animate(0.85);  // تعيين قيمة التقدم إلى 85%

            // تهيئة Swiper لعرض شرائح البطاقات
            var swiper1 = new Swiper(".cardswiper", {
                slidesPerView: "auto",
                spaceBetween: 0,
                pagination: false
            });

            // تهيئة Swiper لعرض شرائح الاتصالات
            var swiper2 = new Swiper(".connectionwiper", {
                slidesPerView: "auto",
                spaceBetween: 0,
                pagination: false
            });
        }
    });
