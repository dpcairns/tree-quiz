/* eslint-disable */

// import functions and grab DOM elements
import { rawData } from './data.js';
import { getRandomTree } from './treeUtils.js';

const nextButton = document.getElementById('next');
const answerDiv = document.querySelector('#answer');

let tries = 0;
let remainingTrees = rawData.slice();
let incorrectAnswers = [];
let correctAnswer = null;

function setPage() {
    if (remainingTrees.length <= 1) {
        alert('show results');
    }

    const randomTree1 = getRandomTree(remainingTrees);
    let randomTree2 = getRandomTree(remainingTrees);
    
    while (randomTree1.id === randomTree2.id) {
        randomTree2 = getRandomTree(remainingTrees);
    }
    
    // we need a correct tree . . . which one is correct?
    // IT DOESNT MATTER WHICH ONE, as long as it hasn't been picked before
    
    const randomZeroOrOne = Math.round(Math.random());
    
    
    if (randomZeroOrOne === 0) {
        correctAnswer = randomTree1;
    } else {
        correctAnswer = randomTree2;
    }
    
    
    answerDiv.textContent = correctAnswer.name;
    // grab the array of labels
    const labels = document.querySelectorAll('label');
    
    // get the first label
    const firstLabel = labels[0];
    // get the input in the first label
    const input1 = firstLabel.children[1];
    // get the img in the first label
    const img1 = firstLabel.children[2];
    
    // the value property tells us what the user clicked
    input1.value = randomTree1.id;
    img1.src = randomTree1.image;
    
    // do the same thing for the second label
    const secondLabel = labels[1];
    const input2 = secondLabel.children[1];
    input1.addEventListener('click', eventHandler);
    const img2 = secondLabel.children[2];
    
    // the value property tells us what the user clicked
    input2.value = randomTree2.id;
    input2.addEventListener('click', eventHandler);
    img2.src = randomTree2.image; 
    
    input1.disabled = false;
    input2.disabled = false;
    const guessDiv = document.getElementById('guesses');
    guessDiv.classList.remove('disabled');
    nextButton.classList.add('hidden');

}

function eventHandler(e) {
    tries++;

    const whatTheyClicked = e.target.value;
    if (whatTheyClicked === correctAnswer.id) {
        // splice this tree off our remaining trees array
        let indexOfTree;

        // iterating through all remaining trees
        for (let i = 0; i < remainingTrees.length; i++) {
            // for each remaining tree
            const tree = remainingTrees[i];

            // if this is the tree they clicked
            if (tree.id === whatTheyClicked) {
                // this is the correct index
                indexOfTree = i;
            }
        }

        remainingTrees.splice(indexOfTree, 1);
        alert('correct!');
    } else {
        alert('wrong!');
        incorrectAnswers.push(whatTheyClicked);
    }

    const labels = document.querySelectorAll('label');
    
    // get the first label
    const firstLabel = labels[0];
    const secondLabel = labels[1];
    // get the input in the first label
    const input1 = firstLabel.children[1];
    const input2 = secondLabel.children[1];

    input1.addEventListener('click', eventHandler);

    input1.disabled = true;
    input2.disabled = true;
    const guessDiv = document.getElementById('guesses');
    guessDiv.classList.add('disabled');
    nextButton.classList.remove('hidden');
}

nextButton.addEventListener('click', setPage);

setPage();