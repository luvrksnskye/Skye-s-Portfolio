const puppyImage = document.querySelector('img[src="assets/puppy.gif"]');
const badgeImage = document.createElement('img');
badgeImage.src = 'assets/Badge.png';
badgeImage.classList.add('badge');
badgeImage.classList.add('badge-jump');
document.body.appendChild(badgeImage);

const barkSound = new Audio('assets/sounds/undertale dog bark.mp3');
let musicPlaylist = null;
let isPlaying = false;
let playlistTimeout = null;


function createPlaylist() {

    const musicFiles = [
        'assets/music/Needy Streamer Overload OST - 04 Angel Falling.mp3',
        'assets/music/00.mii-maker.mp3',
        'assets/music/01. Opening Part 1.mp3',
        'assets/music/02. Title Screen.mp3',
        'assets/music/03. Shampoodle.mp3',
        'assets/music/04. Apartment Theme.mp3',
        'assets/music/05. Masaki Motoharu (cheerful).mp3',
        'assets/music/06. Tokyo.mp3',
        'assets/music/07. Field by Night.mp3',
        'assets/music/08. Giddy Sky 1.mp3',
        'assets/music/09. Toudou Tatsuko Theme.mp3',
        'assets/music/10. Downtown.mp3',
        'assets/music/11. All Too Authentic [Dungeon].mp3',
        'assets/music/12. Shake Your Pet Shop (Beats N Bops).mp3',
        'assets/music/13. Aoki Chiharu Theme Hope Arrange.mp3',
        'assets/music/14. Been a Long Time Since We Crossed Over.mp3',
        'assets/music/15. Toy - Peach Kart.mp3',
        'assets/music/16. BGM 1.mp3',
        'assets/music/17. FabStyle.mp3',
        'assets/music/18. Heart Event Theme 3.mp3',
        'assets/music/19. Akagi Kazuyuki Theme.mp3',
        'assets/music/20. Giddy Sky 2.mp3',
        'assets/music/21. Doggy Digs Me (Beats N Bops).mp3',
        'assets/music/22. Los Angeles.mp3',
        'assets/music/23. BGM 2.mp3',
        'assets/music/24. Championship Medal and Everyone_s W.mp3',
        'assets/music/25. Exhibition.mp3',
        'assets/music/26. My Place (Aircheck).mp3',
        'assets/music/27. Cool.mp3',
        'assets/music/28. Kaiwa Kaiwa3.mp3',
        'assets/music/29. Fujii Natsumi Theme.mp3',
        'assets/music/30. Perry_s Dream ~ Full Version~.mp3',
        'assets/music/31. Shop.mp3',
        'assets/music/32. Neighbourhood.mp3',
        'assets/music/33. Menu3.mp3',
        'assets/music/34. Hibiya Wataru Theme.mp3',
        'assets/music/35. Map (winter).mp3',
        'assets/music/36. Spring Season.mp3',
        'assets/music/37. Nishimoto Haruhi Theme.mp3',
        'assets/music/38. Goddess.mp3',
        'assets/music/39. Mini Game1.mp3',
        'assets/music/40. BGM 3.mp3',
        'assets/music/41. Event 5.mp3',
        'assets/music/42. Story Mode.mp3',
        'assets/music/43. Amachi Shouta (Angel Mode).mp3',
        'assets/music/44. Summer Theme.mp3',
        'assets/music/45. Title Theme.mp3',
        'assets/music/46. Ending.mp3',
        'assets/music/creative-exercise.mp3',
        'assets/music/wii-shop.mp3',
        'assets/music/undertale-shop.mp3',
        'assets/music/SAVE The World.mp3'
    ];
    
    

    musicPlaylist = document.createElement('audio');
    

    musicPlaylist.volume = 0.4;

    let currentTrack = 0;
    
    function loadTrack(index) {
        musicPlaylist.src = musicFiles[index];
        musicPlaylist.load();
    }
    

    musicPlaylist.addEventListener('ended', function() {
        currentTrack = (currentTrack + 1) % musicFiles.length;
        loadTrack(currentTrack);
        musicPlaylist.play();
        console.log('Now playing: ' + musicFiles[currentTrack].split('/').pop());
    });
    

    loadTrack(currentTrack);
    document.body.appendChild(musicPlaylist);
}


puppyImage.addEventListener('click', function() {

    puppyImage.classList.add('jump');
    

    setTimeout(() => {
        puppyImage.classList.remove('jump');
    }, 500);
    

    barkSound.play();
    

    if (!musicPlaylist) {
        createPlaylist();
    }
    

    if (playlistTimeout) {
        clearTimeout(playlistTimeout);
    }
    

    playlistTimeout = setTimeout(() => {
        if (isPlaying) {
            musicPlaylist.pause();
            console.log('Music paused');
        } else {
            musicPlaylist.play();
            console.log('Music playing: ' + musicPlaylist.src.split('/').pop());
            // Stop the badge jumping animation when music starts
            badgeImage.classList.remove('badge-jump');
        }
        isPlaying = !isPlaying;
    }, 2000);
});