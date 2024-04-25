import { Component } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent {
  // Possible wins:

  // 123,456,789,147,258,369,159,951,741,852,963,987,654,321 (14 possibilities)
  // 1 | 2 | 3
  // --+---+--
  // 4 | 5 | 6
  // --+---+--
  // 7 | 8 | 9
  // number: number = 0;
  // currentValue: string = "X";

  // xORo() {
  //   if (this.number == 9){
  //     console.log("Game over");
  //   }
  //   else if (this.number % 2 == 0) {
  //     console.log("O");
  //   } else if (this.number % 2 != 0) {
  //     console.log("X");
  //   }
  //   console.log(this.number)
  //   this.number++;
  //   return;
  // }

  // toggleValue() {
  //   this.currentValue = this.currentValue === "X" ? "O" : "X"; // Toggle between "X" and "O"
  // }

  buttonValues: string[] = new Array(9).fill(""); // Initialize an array with 9 empty strings
  number: number = 0;
  resetNumber: number = 9;

  toggleValue(index: number) {
    if (this.buttonValues[index] === "") {
      this.buttonValues[index] = this.number % 2 === 0 ? "X" : "O"; // Set "X" if number is even, otherwise "O"
    } else if (this.buttonValues[index] === "X") {
      this.buttonValues[index] = "O"; // Set "O" if the button value is "X"
    } else {
      this.buttonValues[index] = "X"; // Set "X" if the button value is "O"
    }
    this.number++;
    if (this.number == 9) {
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
        this.buttonValues[i] = ""; // Assign an empty string to each button value
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
        const resetButton = document.getElementsByClassName("resetButton")[0] as HTMLElement | undefined;
        const displayWinner = document.getElementsByClassName("displayWinner")[0] as HTMLElement | undefined;
        if (resetButton && displayWinner) {
          displayWinner.style.display = 'flex';
          resetButton.style.display = 'block'; // Set style if resetButton exists
        }
        return(this.buttonValues[a]);
      }
    }
  
    return("neither"); // No winner found
  }
}
