let array = [];

function generateArray() {
  array = [];
  for (let i = 0; i < 30; i++) {
    array.push(Math.floor(Math.random() * 100) + 10); // Random values between 10 and 100
  }
  renderArray();
}

function renderArray() {
  const arrayContainer = document.getElementById("array-container");
  arrayContainer.innerHTML = "";
  array.forEach((value) => {
    const bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = `${value * 3}px`; // Scaling the bar height
    arrayContainer.appendChild(bar);
  });
}

// Bubble Sort
async function bubbleSort() {
  let n = array.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - 1 - i; j++) {
      if (array[j] > array[j + 1]) {
        await swap(j, j + 1);
      }
    }
  }
}

// Merge Sort
async function mergeSort() {
  await mergeSortHelper(0, array.length - 1);
}

async function mergeSortHelper(left, right) {
  if (left < right) {
    let middle = Math.floor((left + right) / 2);
    await mergeSortHelper(left, middle);
    await mergeSortHelper(middle + 1, right);
    await merge(left, middle, right);
  }
}

async function merge(left, middle, right) {
  let leftArray = array.slice(left, middle + 1);
  let rightArray = array.slice(middle + 1, right + 1);
  let i = 0, j = 0, k = left;

  while (i < leftArray.length && j < rightArray.length) {
    if (leftArray[i] < rightArray[j]) {
      array[k++] = leftArray[i++];
    } else {
      array[k++] = rightArray[j++];
    }
    renderArray();
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  while (i < leftArray.length) {
    array[k++] = leftArray[i++];
  }

  while (j < rightArray.length) {
    array[k++] = rightArray[j++];
  }

  renderArray();
}

// Quick Sort
async function quickSort() {
  await quickSortHelper(0, array.length - 1);
}

async function quickSortHelper(low, high) {
  if (low < high) {
    let pivotIndex = await partition(low, high);
    await quickSortHelper(low, pivotIndex - 1);
    await quickSortHelper(pivotIndex + 1, high);
  }
}

async function partition(low, high) {
  let pivot = array[high];
  let i = low - 1;

  for (let j = low; j < high; j++) {
    if (array[j] < pivot) {
      i++;
      await swap(i, j);
    }
  }

  await swap(i + 1, high);
  return i + 1;
}

// Insertion Sort
async function insertionSort() {
  let n = array.length;
  for (let i = 1; i < n; i++) {
    let key = array[i];
    let j = i - 1;

    while (j >= 0 && array[j] > key) {
      array[j + 1] = array[j];
      j--;
      renderArray();
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    array[j + 1] = key;
    renderArray();
  }
}

// Swap function with animation
async function swap(i, j) {
  const temp = array[i];
  array[i] = array[j];
  array[j] = temp;
  renderArray();
  await new Promise(resolve => setTimeout(resolve, 100));
}

// Initial array
generateArray();
