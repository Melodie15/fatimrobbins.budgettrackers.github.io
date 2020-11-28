const request = window.indexedDB.open("budgettracker", 1);

// Create schema
request.onupgradeneeded = event => {
    const db = event.target.result;

    // Creates an object store with a listID keypath that can be used to query on. We could pass autoIncrement:true to the keyPath object to prevent us from having to do it manually in the add() below
    const budgetStore = db.createObjectStore("budget", { autoIncrement: true });

    // Creates a statusIndex that we can query on.
    // toDoListStore.createIndex("statusIndex", "status");
}

// Opens a transaction, accesses the toDoList objectStore and statusIndex.
request.onsuccess = () => {
    const db = request.result;

    // Opens a readwrite transaction ready for adding data
    const transaction = db.transaction(["toDoList"], "readwrite");

    // Creates an object store on the transaction
    const toDoListStore = transaction.objectStore("toDoList");

    // Opens a named index in the current object store and allows us to getAll by indexed keypath "status"
    const statusIndex = toDoListStore.index("statusIndex");

    // Adds data to our objectStore
    toDoListStore.add({ status: "complete" });
    toDoListStore.add({ status: "in-progress" });
    toDoListStore.add({ status: "complete" });
    toDoListStore.add({ status: "backlog" });

    // Return an item by keyPath "listID"
    const getRequest = toDoListStore.get(2);
    getRequest.onsuccess = () => {
        console.log(getRequest.result);
    };

    // Return an item by index "status"
    const getRequestIdx = statusIndex.getAll("complete");
    getRequestIdx.onsuccess = () => {
        console.log(getRequestIdx.result);
    };

};
function sendDabatase() {
   
  }
  function saveData() {
   
}
