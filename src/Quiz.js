import React, {Component} from 'react';
import QuizOptions from './QuizOptions';
import classNames from 'classnames';

class Quiz extends Component {

  constructor(props) {
    super(props);
    //Move riddle object into its own function playGame
    let riddle = this.playGame();
    let correct = false;
    let gameOver = false;

    this.state = {riddle, correct, gameOver};

    this.renderOptions = this.renderOptions.bind(this);
    this.checkResults = this.checkResults.bind(this);
    this.play = this.play.bind(this);
  };
  //Generate random numbers for potential answers
  randomNumber(min, max) {
    return Math.floor(Math.random() * (max-min+1)) + min;
  }
//Function to generate array of potential answers, takes the sum as a param which is correct answer
generateRandomOptions(sum) {
  let resultsArray = [];
  let randomNumberArray = [];

  while (randomNumberArray.length <= 3) {
    let randomNumber = this.randomNumber(1, 19);
    if(randomNumberArray.indexOf(randomNumber) > -1) continue;
    randomNumberArray.push(randomNumber);
  }
  //Loop over array 3 times to get random options
  for (let i = 0; i < 3; i++) {
    //Generate random numbers higher and lower than the value of the answer
    let addSubtract = this.randomNumber(0,1);
    let result = sum;
    if (addSubtract === 1) {
      //add number to result
      result += randomNumberArray[i];
      resultsArray.push(result);
    } else {
      //subtract the number from the result
      result -= randomNumberArray[i];
      resultsArray.push(result);
    }
  }
  return resultsArray;
}

  playGame() {
    let field1 = this.randomNumber(20, 50);
    let field2 = this.randomNumber(20, 50);
    let result = field1 + field2;
    let resultsArray = this.generateRandomOptions(result);
    //Adds total to array to give user a correct answer to choose from
    resultsArray.push(result);
    //Randomizes the order of options for user
    resultsArray.sort(function(a,b) {return 0.5 - Math.random()});
    console.log(resultsArray);
    let riddle = {
      //Options displayed to choose from
      resultsArray: resultsArray,
      //Fields are the 2 numbers user must add
      field1: field1,
      field2: field2,
      //Logic for the correct answer
      answer: result
    };
    //output of riddle object
    console.log(riddle);
    //Updates state for different pair of numbers after user answer attempt
    if(this.state && this.state.gameOver) {
      this.setState({riddle: riddle});
    } else {
      return riddle;
    }
  }

checkResults(options) {
  console.log('checked called' + options);
  //Check to see if clicked option is correct
  if(this.state.riddle.answer === options) {
    console.log('correct answer');
    this.setState({correct: true, gameOver: true});
  } else {
    console.log('wrong answer');
    this.setState({correct: false, gameOver: true});
  }
}

//Used to seperate quiz logic from options logic
    renderOptions() {
      return(
        <div className="options">
        {this.state.riddle.resultsArray.map((option,i) =>
            <QuizOptions options={option} key={i} checkResults={(options) => this.checkResults(options)}/>
      )}
        </div>
      );
    }
//Function used to show user play again div if answer was right or wrong
    renderMessage() {
      if(this.state.correct) {
        return <h3>Excellent! Click the button below to play again!</h3>
      } else {
        return <h3>Unacceptabllllllle! Click the button below to play again</h3>
      }
    }
//Function used to reset game board
    play() {
      this.setState({correct: false, gameOver: false});
      this.playGame();
    }

  render() {
    return(
      //HTML body structure
      <div className="quiz">
        <div className="quiz-content">
          <p className="question">What is the sum of <span className="text-info">{this.state.riddle.field1}</span> and <span className="text-info">{this.state.riddle.field2}</span>?</p>
          {this.renderOptions()}
        </div>

        <div
        //Special NPM package used to adjust CSS depending upon state
        className={classNames("after", {"hide": !this.state.gameOver}, {"wrong animated zoomInDown": !this.state.correct}, {"correct animated zoomInDown": this.state.correct})}>
        {this.renderMessage()}
        </div>
        <div className="play-again">
          <a className="button" onClick={this.play}>Play Again</a>
        </div>
      </div>
    );
  }
}

export default Quiz;
