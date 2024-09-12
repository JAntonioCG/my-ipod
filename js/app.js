const music = document.getElementById('audio')
const seekBar = document.querySelector('.seek-bar')
const songName = document.querySelector('.music-name')
const artistName = document.querySelector('.artist-name')
const disk = document.querySelector('.disk')
const currentTime = document.querySelector('.current-time')
const musicDuration = document.querySelector('.song-duration') //
const playBtn = document.querySelector('.play-btn')
const forwardBtn = document.querySelector('.forward-btn')
const backwardBtn = document.querySelector('.backward-btn')

let currentMusic = 0

playBtn.addEventListener('click', () => {
  if (playBtn.className.includes('pause')) {
    music.play()
  } else {
    music.pause()
  }
  playBtn.classList.toggle('pause')
  disk.classList.toggle('play')
})

const setMusic = index => {
  seekBar.value = 0
  let song = songs[index]
  currentMusic = index
  music.src = song.path
  songName.innerHTML = song.name
  artistName.innerHTML = song.artist
  disk.style.backgroundImage = `url('${song.cover}')`

  currentTime.innerHTML = '00:00'
  setTimeout(() => {
    seekBar.max = music.duration
    musicDuration.innerHTML = formathTime(music.duration)
  }, 3000)
}

setMusic(0)

const formathTime = time => {
  let min = Math.floor(time/60)
  if (min < 10) {
    min = `0${min}`
  }
  let sec = Math.floor(time % 60)
  if (sec < 10) {
    sec = `0${sec}`
  }
  return `${min} : ${sec}`
}

setInterval(() => {
  seekBar.value = music.currentTime
  currentTime.innerHTML = formathTime(music.currentTime)
  if (Math.floor(music.currentTime) === Math.floor(seekBar.max)) {
    // forwardBtn.click()
  }
}, 500)

seekBar.addEventListener('chage', () => {
  music.currentTime = seekBar.value
})

const playMusic = () => {
  music.play()
  playBtn.classList.remove('pause')
  disk.classList.add('play')
}

forwardBtn.addEventListener('click', () => {
  if (currentMusic >= songs.length - 1) {
    currentMusic = 0
  } else {
    currentMusic++
  }
  setMusic(currentMusic)
  playMusic()
})

backwardBtn.addEventListener('click', () => {
  if (currentMusic <= 0) {
    currentMusic = songs.length - 1
  } else {
    currentMusic --
  }
  setMusic(currentMusic)
  playMusic()
})
