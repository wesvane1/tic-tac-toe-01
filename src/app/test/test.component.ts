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

    if (this.buttonValues[index] === "") {
      this.buttonValues[index] = this.number % 2 === 0 ? "X" : "O"; // Set "X" if number is even, otherwise "O"
      this.isButtonDisabled[index] = true;
    }
    this.number++;
    if (this.number == 8) {
      const resetButton = document.getElementsByClassName("resetButton")[0] as HTMLElement | undefined;
      if (resetButton) {
        resetButton.style.display = 'block'; // Set style if resetButton exists
      }
      this.number = 0;
    }
    this.checkWinner()
  }

  resetButton() {
    if (this.resetNumber >= 0) {
      for (let i = 0; i < this.buttonValues.length; i++) {
        let Button = document.querySelector(`.b${i}`) as unknown as HTMLElement;
        Button.style.backgroundColor = 'white';
        this.buttonValues[i] = ""; // Assign an empty string to each button value
        this.isButtonDisabled[i] = false;
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
  
    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (this.buttonValues[a] && 
        this.buttonValues[a] === this.buttonValues[b] && 
        this.buttonValues[a] === this.buttonValues[c]) {
          // return this.buttonValues[a]; // Return the mark of the winner
        for (const i of combination){
          let Button = document.querySelector(`.b${i}`) as unknown as HTMLElement;
          if (Button){
            Button.style.backgroundColor = 'green';
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
