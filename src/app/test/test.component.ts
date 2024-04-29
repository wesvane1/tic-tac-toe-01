import { Component } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent {

  buttonValues: string[] = new Array(9).fill(""); // Initialize an array with 9 empty strings
  isButtonDisabled: boolean[] = Array(9).fill(false); // Initialize an array of 9 values all set to false
  number: number = -1;
  resetNumber: number = 8;

  

  toggleValue(index: number) {
    const resetButton = document.getElementsByClassName("resetButton")[0] as HTMLElement | undefined;

    // This computes the use of X or O, based on click number. It also counts the click number
    if (this.buttonValues[index] === "") {
      this.buttonValues[index] = this.number % 2 === 0 ? "X" : "O"; // Set "X" if number is even, otherwise "O"
      this.isButtonDisabled[index] = true;
    }
    this.number++;

    // When the number of click reaches 9, then it displays the reset button and checks for the winner.
    if (this.number == 8) {
      if (resetButton) {
        resetButton.style.display = 'block'; // Set style if resetButton exists
      }
      this.number = 0;
    }
    this.checkWinner()
  }

  resetButton() {
    let resetButton = document.getElementsByClassName("resetButton")[0] as HTMLElement;
    const displayWinner = document.getElementsByClassName("displayWinner")[0] as HTMLElement;
    if (this.resetNumber >= 0) {
      for (let i = 0; i < this.buttonValues.length; i++) {
        // This has to be in the for loop because it has to assign to all buttons
        let Button = document.querySelector(`.grid-item${i}`) as unknown as HTMLElement;

        // This changes the background of all buttons to white
        Button.style.border = 'none';

        // This resets all buttons to have no text
        this.buttonValues[i] = ""; // Assign an empty string to each button value

        // This allows you to click all buttons again
        this.isButtonDisabled[i] = false;

        // When you reset the page after a win, the reset button and winner text disappears
        resetButton.style.display = 'none';
        displayWinner.style.display = 'none';
      }
    }
  }


  checkWinner(): string | null {
    const winningCombinations = [
      // Rows
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      // Columns
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      // Diagonals
      [0, 4, 8], [2, 4, 6]
    ];
    // This checks all possible combinations, with the winning combinations to see if one was actually met by X or O
    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (this.buttonValues[a] && this.buttonValues[a] === this.buttonValues[b] && this.buttonValues[a] === this.buttonValues[c]) {
        // This loops through each number in the winning combination, ex [0,1,2]
        for (const i of combination){
          let Button = document.querySelector(`.grid-item${i}`) as unknown as HTMLElement;

          // This changes the winning combination to have a green background
          if (Button){
            Button.style.border = '5px solid green';
          }
        }
        const resetButton = document.getElementsByClassName("resetButton")[0] as HTMLElement | undefined;
        const displayWinner = document.getElementsByClassName("displayWinner")[0] as HTMLElement | undefined;
        if (resetButton && displayWinner) {
          displayWinner.style.display = 'flex';
          resetButton.style.display = 'block'; // Set style if resetButton exists
        }
        return(this.buttonValues[a]);
      }
    }
  
    return(""); // No winner found
  }
}
