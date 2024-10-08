$(document).ready(function () {
    // 初始化导航高亮
    $('.navbar-nav .nav-item .nav-link').addClass('inactive');
    $('.navbar-nav .nav-item .nav-link').eq(0).addClass('active').removeClass('inactive');

    // 定义section数组
    var sectionArray = [1, 2, 3, 4, 5, 6];
    var hasInteracted = false; // 用于跟踪用户是否已经与页面交互

    // 为每个section绑定滚动事件
    $.each(sectionArray, function (index, value) {
        var $section = $('#' + 'section_' + value);

        // 滚动事件，用于导航高亮
        $(document).scroll(function () {
            var offsetSection = $section.offset().top - 83;
            var docScroll = $(document).scrollTop();

            if (docScroll >= offsetSection && !hasInteracted) {
                hasInteracted = true;
                setActiveNavLink(index);
                startMusic(); // 触发音乐播放
            }
        });
    });

    // 点击事件，用于平滑滚动到指定section
    $('.dianji-chufa').click(function (e) {
        e.preventDefault();
        var index = $(this).data('section-index'); // 假设每个.dianji-chufa元素都有一个data-section-index属性
        var $section = $('#' + 'section_' + sectionArray[index]);
        var offsetClick = $section.offset().top - 83;
        $('html, body').animate({
            'scrollTop': offsetClick
        }, 300, function () {
            // 动画完成后，如果尚未交互，则播放音乐
            if (!hasInteracted) {
                startMusic();
                hasInteracted = true;
            }
        });
    });

    // 首次点击页面任何地方触发音乐播放
    $(document).one('click', function (event) {
        if (!hasInteracted) {
            startMusic();
            hasInteracted = true;
        }
    });

    // 首次滚动页面触发音乐播放
    $(window).one('scroll', function () {
        if (!hasInteracted) {
            startMusic();
            hasInteracted = true;
        }
    });
});

function setActiveNavLink(index) {
    // 移除所有导航链接的'active'类
    $('.navbar-nav .nav-item .nav-link').removeClass('active').addClass('inactive');
    // 为当前section的导航链接添加'active'类，并移除'inactive'类
    $('.navbar-nav .nav-item .nav-link').eq(index).removeClass('inactive').addClass('active');
}

// 音乐播放控制
function startMusic() {
    var music = document.getElementById("bg-music");
    if (music.paused) {
        music.play().catch(function () {
            console.log("自动播放被阻止，显示播放按钮提示");
        });
    }
}

document.addEventListener("DOMContentLoaded", function () {
    var music = document.getElementById("bg-music");
    var control = document.getElementById("audio-control");
    var nextSongBtn = document.getElementById("next-song");
    var prevSongBtn = document.getElementById("prev-song");

    // 移除自动播放属性
    music.autoplay = false;
    music.loop = true; // 设置音乐循环播放

    // 初始音量设置
    music.volume = 0;
    setTimeout(function () {
        music.volume = 0.3; // 设置初始音量
    }, 500); // 1秒后音量增加到40%

    // 音乐播放/暂停切换
    control.addEventListener("click", function () {
        if (music.paused) {
            music.play();
            control.classList.remove("mute");
            control.setAttribute("data-hover-text", "关闭背景音乐");
        } else {
            music.pause();
            control.classList.add("mute");
            control.setAttribute("data-hover-text", "开启背景音乐");
        }
    });

// 音乐下一首切换
    nextSongBtn.addEventListener("click", function () {
        var sources = music.getElementsByTagName("source");
        var currentSourceIndex = Array.from(sources).findIndex(source => source.src === music.currentSrc);
        var nextIndex = (currentSourceIndex + 1) % sources.length;
        music.src = sources[nextIndex].src;
        music.load();
        music.play();
    });

// 音乐上一首切换
    prevSongBtn.addEventListener("click", function () {
        var sources = music.getElementsByTagName("source");
        var currentSourceIndex = Array.from(sources).findIndex(source => source.src === music.currentSrc);
        var prevIndex = (currentSourceIndex - 1 + sources.length) % sources.length;
        music.src = sources[prevIndex].src;
        music.load();
        music.play();
    });

    // 监听音乐播放错误
    music.addEventListener('error', function (e) {
        console.error('Media error:', e);
        // 错误处理逻辑
    });
});


document.getElementById("bg-music").addEventListener('play', () => {
    document.querySelector("#music-status").src = "/images/music_play.png"
});
document.getElementById("bg-music").addEventListener('pause', () => {
    document.querySelector("#music-status").src = "/images/music_pause.png"
});
console.log("[MusicBtn] Init\nPowered by MZCompute GmbH [wang@mingze.de]")