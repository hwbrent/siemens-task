import React, {useState, useEffect} from "react";
import '../App.css';

//////////////////////////
//// Helper Functions ////
//////////////////////////

/**
 * Used to sort an array of objects based on the value of their `.useBy` attribute
 * @param {Object} a object a
 * @param {Object} b object b
 * @returns {number} -1, 0, 1 depending on the comparison of size
 */
function sortByDate(a,b) {
    if (a.useBy < b.useBy) return -1;     // a goes before b
    else if (a.useBy > b.useBy) return 1; // a goes after b
    else return 0;                        // they have the same value
}

/**
 * Returns the string with the first letter of each word capitalised 
 * @param {String} string a single word or sentence 
 * @returns {String} string
 */
const capitalise = (string) => string.split(" ").map(word => word[0].toUpperCase() + word.slice(1,word.length)).join(" ")

/**
 * Returns the date converted from yyyy-mm-dd to dd/mm/yyyy
 * @param {String} dateString 
 * @returns {String} 
 */
const formatDate = (dateString) => dateString.split("-").reverse().join("/");


/////////////////////////////////////////////////////////////////////////////


// main React Component
export default function List() {
    
    const exampleList = [
        {"name": "pop tart", "useBy": "2022-02-21"},
        {"name": "bread rolls", "useBy": "2022-02-01"},
        {"name": "bacon sarnie", "useBy": "2022-02-27"}
    ];

    // state trackers to 
    const [showList, setShowList] = useState(true);
    const [showAddItem, setShowAddItem] = useState(true);
    const [showRemoveItem, setShowRemoveItem] = useState(true);
    const [displaySorted, setDisplaySorted] = useState(false);

    // list of objects, which each object being a food item. Their attributes are "name" and "useBy"
    const [itemObjects, setItemObjects] = useState(exampleList);
    
    // state trackers for the form values for the name and use-by of the item being added
    const [newItemName, setNewItemName] = useState("");
    const [newItemUseBy, setNewItemUseBy] = useState("");



    // stops the form submitting, then adds new item object to `itemObjects`, then resets form fields
    const handleFormSubmit = (event) => {
        event.preventDefault();
        setItemObjects(prev => [...prev, {"name": newItemName, "useBy": newItemUseBy}]);
        setNewItemName("");
        setNewItemUseBy("");
    }

    // form for adding new food items. Has fields for item name and item use-by date
    const form = (
        <form onSubmit={handleFormSubmit}>
            <label>
                Name:
                {/* Input for the food item name */}
                <input required type="text" value={newItemName} onChange={({target}) => setNewItemName(target.value)} placeholder="e.g. pop tart" />
            </label> <br/>
            <label>
                Use-by:
                {/* Input for the food item's use-by date */}
                <input required type="date" value={newItemUseBy} onChange={({target}) => setNewItemUseBy(target.value)} />
            </label>
            <br/>
            <button type="submit">Add</button>
        </form>
    );



    // defaults to equality being true -> unsorted list being shown. If checkbox is checked, shows sorted list
    const arrayToBeMapped = (!displaySorted) ? itemObjects : [...itemObjects].sort(sortByDate);

    // maps each item object to a div which is displayed on the screen
    const mapped = arrayToBeMapped.map((obj, key) => {

        // function to filter item out of `itemObjects`
        const handleDeleteButtonClick = () => setItemObjects(prev => prev.filter((_, index) => index !== key));
        const deleteButton = <button type="button" onClick={handleDeleteButtonClick}>{"🗑️" || "Delete"}</button>;

        // the div which is displayed on the screen
        const div = (
            <div className="listItem" key={key}>
                Name:   {capitalise(obj.name)}    &nbsp;&nbsp;
                Use-by: {formatDate(obj.useBy)}   &nbsp;&nbsp;
                {(showRemoveItem) ? deleteButton : null}
            </div>
        );

        return div;
    })

    return (
        <>
            <h1>Software Engineer Web Dev Internship - Interview Exercise</h1>
            <h5>Type an item name along with a use-by date into the below form to add the item to the list!</h5>

            <label>
                Show list:
                <input type="checkbox" checked={showList} onClick={() => setShowList(prev => !prev)}/>
            </label> <br/>

            <label>
                Add item:
                <input type="checkbox" checked={showAddItem} onClick={() => setShowAddItem(prev => !prev)}/>
            </label> <br/>

            <label>
                Remove item:
                <input type="checkbox" checked={showRemoveItem} onClick={() => setShowRemoveItem(prev => !prev)}/>
            </label> <br/>

            <label>
                Order by use-by date:
                <input type="checkbox" checked={displaySorted} onClick={({target}) => setDisplaySorted(target.checked)} />
            </label>

            {(showAddItem) ? <><hr/> {form}</>: null}

            <hr/>

            {/* array of divs */}
            {(showList) ? mapped : null}
        </>
    );
}
