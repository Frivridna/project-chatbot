// All the DOM selectors stored as short variables
const chat = document.getElementById('chat')
const inputWrapper = document.getElementById('input-wrapper')
const input = document.getElementById('user-input')
const submit = document.getElementById('send-btn')

// Global variables, if you need any, declared here
let questionNumber = 1

let movLength;
let genderDir;

const userReply = (msg) => {
  showMessage(msg, 'user')
}

// Functions declared here

// This function will add a chat bubble in the correct place based on who the sender is
const showMessage = (message, sender) => {
  if (sender === 'user') {
    console.log(sender); 
    chat.innerHTML += `
      <section class="user-msg">
        <div class="bubble user-bubble">
          <p>${message}</p>
        </div>
        <img src="assets/user3.png" alt="User" />  
      </section>
    `
  } else if (sender === 'bot') {
    console.log(sender);
    chat.innerHTML += `
      <section class="bot-msg">
        <img src="assets/bot2.png" alt="Bot" />
        <div class="bubble bot-bubble">
          <p>${message}</p>
        </div>
      </section>
    `
  }
  // This little thing makes the chat scroll to the last message when there are too many to be shown in the chat box
  chat.scrollTop = chat.scrollHeight
}

//This function will lead the user to a button where they can reload the bot after pressing no to the second question
const reloadBot = () => {
  showMessage('Too bad, let me know if you change your mind!', 'bot')
  inputWrapper.innerHTML = `
    <div>
      <button id="reloadBtn">Restart</button>
    </div>
  `
  document.getElementById('reloadBtn').addEventListener('click', () => {
    setTimeout(()=>{location.reload();},2000)
  })
}

const nextQuestion = (message) => {
  console.log('questionNumber', questionNumber)

  if (questionNumber === 1) {
    userReply(message)
    input.value = ''
    setTimeout(() => movieTips(message), 500)
  } else if (questionNumber === 2) {
    userReply(message)
    setTimeout(() => movieLength(message), 1000)
  } else if (questionNumber === 3) {
    userReply(message)
    setTimeout(() => gender(message), 1000)
  } else if (questionNumber === 4) {
    userReply(message)
    setTimeout(() => movieGenre(message), 1000)
  } else if (questionNumber === 5) {
    userReply(message)
    setTimeout(() => movieMenu(message), 1000)
  } else if (questionNumber === 6) {
    userReply(message)
    setTimeout(() => chosenMovie(message), 2000)
  }
};

// Starts here 
const greeting = () => {
  questionNumber = 1
  showMessage(`Hello there, What's your name?`, 'bot')
}

const movieTips = (msg) => {
  console.log('Username is:', msg);
  questionNumber++
  showMessage(`Nice to meet you ${msg}. As you might know, I'm quite a movie expert. 
  Want some tips for tonight?`, 'bot')
  inputWrapper.innerHTML = `
      <div>
        <button id="yesBtn">Yes</button>
        <button id="noBtn">No</button>
      </div>
    `
  document.getElementById('yesBtn').addEventListener('click', () => nextQuestion('Yes'))
  document.getElementById('noBtn').addEventListener('click', () => reloadBot())
}

const movieLength = (yes) => {
  console.log('User pressed:', yes);
  questionNumber++
  showMessage(`${yes} great! How much time do you have?`, 'bot')
  inputWrapper.innerHTML = `
      <div>
        <button id="underBtn">Under 2h</button>
        <button id="overBtn">Over 2h</button>
      </div>
    `
  document.getElementById('underBtn').addEventListener('click', () => nextQuestion('Under 2h'))
  document.getElementById('overBtn').addEventListener('click', () => nextQuestion('Over 2h'))
}

const gender = (length) => {
  console.log('User chose:', length);
  movLength = length;
  questionNumber++
  showMessage(`${length} it is! I know, gender is so 80's... but hey for the sake of statistics in the film industry, let's do the division. Male or female director?`, 'bot')
  inputWrapper.innerHTML = `
      <div>
        <button id="femaleBtn">Female</button>
        <button id="maleBtn">Male</button>
      </div>
    `
  document.getElementById('femaleBtn').addEventListener('click', () => nextQuestion('Female director'))
  document.getElementById('maleBtn').addEventListener('click', () => nextQuestion('Male director'))
} 


const movieGenre = (gender) => {
  console.log('User chose:', gender);
  genderDir = gender;
  questionNumber++
  showMessage(`Great to know your preferences! Now let's move further into the movie djungle...`, 'bot')
  showMessage(`${gender}. What genre are you in the mood for?`, 'bot')
  
  inputWrapper.innerHTML = `
      <div>
        <button id="dramaBtn">Drama</button>
        <button id="thrillerBtn">Thriller</button>
        <button id="comedyBtn">Comedy</button>
        <button id="documentaryBtn">Documentary</button>
      </div>
    `
  document.getElementById('dramaBtn').addEventListener('click', () => nextQuestion('drama'))
  document.getElementById('thrillerBtn').addEventListener('click', () => nextQuestion('thriller'))
  document.getElementById('comedyBtn').addEventListener('click', () => nextQuestion('comedy'))
  document.getElementById('documentaryBtn').addEventListener('click', () => nextQuestion('documentary'))
}

const movieMenu = (type) => {
  console.log('User chose:', type, movLength, genderDir);
  questionNumber++
  showMessage(`Excellent choice - ${type} it is. Here is some movies that I think will get the juices flowing in your taste buds:`, 'bot')
  if (movLength === 'Under 2h') {
      if (type === 'drama') {
        if (genderDir === 'Female director') {
          inputWrapper.innerHTML = `
            <select id="select"> 
              <option value="" selected disabled>Top 3 shorter Dramas with Female directors</option>
              <option value="American Psycho">American Psycho</option>
              <option value="Lost In Translation">Lost In Translation</option>
              <option value="Monster">Monster</option>
            </select>
          `
      }  else {
          inputWrapper.innerHTML = `
            <select id="select"> 
              <option value="" selected disabled>Top 3 shorter Dramas with Male directors</option>
              <option value="La vita è Bella">La vita è Bella</option>
              <option value="Intouchables">Intouchables</option>
              <option value="Eternal Sunshine of the spotless mind">Eternal Sunshine of the spotless mind</option>
            </select>
          `
      }
  }  else if (type === 'thriller') {
        if (genderDir === 'Female director') {
          inputWrapper.innerHTML = `
            <select id="select"> 
              <option value="" selected disabled>Top 3 shorter Thrillers with Female directors</option>
              <option value="The hitch-hiker">The hitch-hiker</option>
              <option value="American psycho">American psycho</option>
              <option value="In the cut">In the cut</option>
            </select>
          `
      }  else {
          inputWrapper.innerHTML = `
            <select id="select"> 
              <option value="" selected disabled>Top 3 shorter Thrillers with Male directors</option>
              <option value="Taken">Taken</option>
              <option value="Reservoir dogs">Reservoir dogs</option>
              <option value="Escape room">Escape room</option>
            </select>
          `
      }
  }  else if (type === 'comedy') {
        if (genderDir === 'Female director') {
          inputWrapper.innerHTML = `
            <select id="select"> 
              <option value="" selected disabled>Top 3 shorter Comedies with Female directors</option>
              <option value="Afterwork stories">Afterwork stories</option>
              <option value="Clueless">Clueless</option>
              <option value="Booksmart">Booksmart</option>
            </select>

          `
      } else {
          inputWrapper.innerHTML = `
            <select id="select"> 
              <option value="" selected disabled>Top 3 shorter Comedies with Male directors</option>
              <option value="Borat">Borat</option>
              <option value="Touchy feely">Touchy feely</option>
              <option value="Death to 2020">Death to 2020</option>
            </select>
          `
      }
  }  else {
        if (genderDir === 'Female director') {
          inputWrapper.innerHTML = `
            <select id="select"> 
              <option value="" selected disabled>Top 3 shorter documentaries with Female directors</option>
              <option value="Blackfish">Blackfish</option>
              <option value="The beginning of Life">The beginning of Life</option>
              <option value="Mommy Dead and Dearest">Mommy Dead and Dearest</option>
            </select>
          `
      } else {
          inputWrapper.innerHTML = `
            <select id="select"> 
              <option value="" selected disabled>Top 3 shorter documentaries with Male directors</option>
              <option value="David Attenborough: A Life on Our Planet">David Attenborough: A Life on Our Planet</option>
              <option value="Man on Wire">Man on Wire</option>
              <option value="The Social Dilemma">The Social Dilemma</option>
            </select>
            `
      }
  }
  } else if (movLength === 'Over 2h') {
      if (type === 'drama') {
        if (genderDir === 'Female director') {
          inputWrapper.innerHTML = `
            <select id="select"> 
              <option value="" selected disabled>Top 3 longer Dramas with Female directors</option>
              <option value="The Hurt Locker">The Hurt Locker</option>
              <option value="Fish Tank">Fish Tank</option>
              <option value="Little Women">Little Women</option>
            </select>
          `
      } else {
          inputWrapper.innerHTML = `
            <select id="select"> 
              <option value="" selected disabled>Top 3 longer Dramas with Male directors</option>
              <option value="The Shawshank Redemption">The Shawshank Redemption</option>
              <option value="Forrest Gump">Forrest Gump</option>
              <option value="Interstellar">Interstellar</option>
            </select>
          `
      }
  } else if (type === 'thriller') {
        if (genderDir === 'Female director') {
          inputWrapper.innerHTML = `
            <select id="select"> 
              <option value="" selected disabled>Top 3 longer Thrillers with Female directors</option>
              <option value="Point break">Point break</option>
              <option value="Fatto di sangue fra due uomini per causa di una vedova. Si sospettano moventi politici">Fatto di sangue fra due uomini per causa di una vedova. Si sospettano moventi politici</option>
              <option value="Bastards">Bastards</option>
            </select>
          `
      } else {
          inputWrapper.innerHTML = `
            <select id="select"> 
              <option value="" selected disabled>Top 3 longer Thrillers with Male directors</option>
              <option value="The Killing of a Sacred Deer">The Killing of a Sacred Deer</option>
              <option value="Sangue do Meu Sangue">Sangue do Meu Sangue</option>
              <option value="Les Diaboliques">Les Diaboliques</option>
            </select>`
      }
  } else if (type === 'comedy') {
        if (genderDir === 'Female director') {
          inputWrapper.innerHTML = `
            <select id="select"> 
              <option value="" selected disabled>Top 3 longer comedies with Female directors</option>
              <option value="Slackwars">Slackwars</option>
              <option value="The New the Bad and the Lazy">The New the Bad and the Lazy</option>
              <option value="Heut ist mein Tag">Heut ist mein Tag</option>
            </select>
          `
      } else {
          inputWrapper.innerHTML = `
            <select id="select"> 
              <option value="" selected disabled>Top 3 longer comedies with Male directors</option>
              <option value="The Big Lebowski">The Big Lebowski</option>
              <option value="Miss Granny">Miss Granny</option>
              <option value="Naui gyeolhon wonjeonggi">Naui gyeolhon wonjeonggi</option>
            </select>
          `
      }
  } else {
        if (genderDir === 'Female director') {
          inputWrapper.innerHTML = `
            <select id="select"> 
              <option value="" selected disabled>Top 3 longer documentaries with Female directors</option>
              <option value="Selma">Selma</option>
              <option value="American Passages">American Passages</option>
              <option value="Totally Under Control">Totally Under Control</option>
            </select>
          `
      } else {
          inputWrapper.innerHTML = `
            <select id="select"> 
              <option value="" selected disabled>Top 3 longer documentaries with Male directors</option>
              <option value="Ikaros">Ikaros</option>
              <option value="Paradise Lost">Paradise Lost</option>
              <option value="Amy">Amy</option>
            </select>
          `
      }
  }
  }

  const select = document.getElementById('select')
  select.addEventListener('change', () => nextQuestion(select.value))
};

const chosenMovie = (select) => {
  console.log('User chose:', select);
  questionNumber++
  showMessage(`Get the popcorn ready and enjoy watching ${select}!`, 'bot')
  showMessage(`Press restart if you want to start over 👇`, 'bot')
    inputWrapper.innerHTML =`
      <div>
        <button id="restartBtn">Yeah, you need to go refresh your taste levels!</button>
      </div>
    `
  document.getElementById('restartBtn').addEventListener('click', () => {
    location.reload()
  })
};


// Set up your eventlisteners here
submit.addEventListener('click', (event) => {
  event.preventDefault();
  nextQuestion(input.value)
})

setTimeout(greeting, 1000)