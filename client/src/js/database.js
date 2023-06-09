import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });


export const putDb = async (content) => {
  
  const database = await openDB("jate", 1);

  const tx = database.transaction("jate", "readwrite");
//connect to our db store
  const store = tx.objectStore("jate");

  const request = store.put({id:1, value:content});

  const result = await request;
  
  console.log(result);

}

export const getDb = async () => {
  const database = await openDB('jate', 1);
 
  const tx = database.transaction("jate", "readonly");
  const store = tx.objectStore("jate");
  const request = store.get(1);
  const result = await request;

  if (result){
    console.log(result.value)
  }

  else {
    console.log("No data found in the database");
  }


}
initdb();
