class Validator {
  static validate(sudoku) {
    const validator = new Validator

    return validator.validate(sudoku)
  }

  validate(sudoku) {
    // Your code here
    let board = box(sudoku)
    visualize(board)
    console.log("rowsCheck:", rowsCheck(board))
    console.log("collumnsCheck:", collumnsCheck(board))
    console.log("blockCheck:", blockCheck(board))
    console.log("finishCheck:", finishCheck(board))
    // console.log(condition(board))
    return condition(board)
  }
}

//Reads input string and creates calculation board
let box = (sudoku) => {
  let board = []
  const box_row = sudoku.split('\n') //Puts rows into array
  let boxbox = box_row.filter(row => row.includes("-") != true) // excludes rows with lines
  boxbox.forEach((rows) => 
    {
      // console.log(rows)
      rows = rows.split('|') // seperates every 3 numbers
      // console.log(rows)
      let collumn = 0
      let numArr = []
      let numbers = rows.forEach( (row) => {
          
          let number = row.replaceAll(" ","") // removes spaces between numbers
          for(let c = 0; c < number.length; c++) {
            // console.log(number[c], number, index, collumn)
            numArr.push(number[c])
            collumn++
          }
          // console.log(numArr)

        } 
      )
      if(numArr.length > 0) board.push(numArr)
      numArr = []
      collumn = 0
      // console.log(board)
      
      
      // console.log(numbers)
    }
  )
  return board
  console.log(boxbox)
  // console.log(numbox)
}

const finishCheck = (box) => {
  // console.log(box)
  let check = !box.some((element) => element.includes('0')) //checks if board has 0
  return check
}

//returns whole check for rows 
const rowsCheck = (box) => {
  let check = true
  check = !box.some(row => !lineCheck(row))
  // console.log(check)
  // box.forEach(row => {
  //   // console.log(row)
  //   // console.log("row:", row)
  //   check = lineCheck(row)
  //   if(!check) return check
  // });
  // console.log("console check", check)
  return check
}
//checks individual line works either with collumn or row or box
const lineCheck = (line) => {
  // console.log("line:",line)
  for (let i = 1; i<10; i++)
      {
        let count = 0 
        for (const number of line) {
          if(number == i) {
            count++
            // console.log(i,number,count)
          }
          if(count>1) 
          {
            // console.log(i,line)
            return false
          }
        }
      }
  // console.log(count,line)
  return true
  
}

//checks all collumns 
const collumnsCheck = (box) => {
  let check = true
  for( let collumn = 0; collumn<box[0].length; collumn++){
    let collumnArr = []
    for ( let row = 0; row<box.length; row++) {
      collumnArr.push(box[row][collumn])
      // console.log(collumnArr)

    }
    // console.log("collumn",collumnArr)
    check = lineCheck(collumnArr)
    if(!check) return check
  }
  return check
}


const blockCheck = (box) => {
  let check = true
  let block = [] //block array for storing blocks
  // console.log(box)
  for( let blockid = 0; blockid<9; blockid++) //iterates trouch block array
  {
    let row = parseInt(blockid/3)*3  //koeficient for block row
    block.push([])
    for(let x = row; x < row+3; x++) //iterates trough every block row
      {
        // console.log(blockk)
        let line = (blockid%3)*3 //koeficient for block collumn
        for( let y = line; y<line+3; y++) //iterates trough every block collumn
        {
          block[blockid].push(box[x][y])
        }
      }
      check = lineCheck(block[blockid]) //checks block array for valid sudoku piece
      if(!check) return check
  }
  // console.log(block)
  return check
}


//visualizes sudoku board in console
const visualize = (box) => { 
  let output = ""
  // console.log(box)
  box.forEach(x => {
    x.forEach(y => {
      output += y.toString() + " "
    })
    output += ' \n'
  })
  console.log(output)
}

//returns condition of checked board 
const condition = (board) => {
  switch (true) {
    case rowsCheck(board) && collumnsCheck(board) && blockCheck(board) && finishCheck(board):
      return "Sudoku is valid."
    break;
    case rowsCheck(board) && collumnsCheck(board) && blockCheck(board):
      return "Sudoku is valid but incomplete."
    break;
    default:
      return "Sudoku is invalid."
  }
}

module.exports = Validator
