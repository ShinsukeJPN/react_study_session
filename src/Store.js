import { createStore } from 'redux';

const initData ={
  tweets: [{tweet: '', timeStamp: '', isFavorited: false }],
  text: '',
  mode: 'default',
  favList: []
};

// Reducer
export function tweetReducer(state = initData, action){
  switch (action.type) {
    case 'ADD':
      return addReduce(state, action);
    case 'DELETE':
      return deleteReduce(state, action);
    case 'FAVORITE':
      return favoriteReduce(state, action);
    case 'CLIPBOARD':
      return clipboardReduce(state, action);
    default:
      return state;
  }
}

// Add Tweet Reducer
function addReduce(state, action){
  let d = new Date(),
  second = '' + d.getSeconds(),
  min  = '' + d.getMinutes(),
  hour = '' + d.getHours(),
  month = '' + (d.getMonth() + 1),
  day = '' + d.getDate(),
  year = d.getFullYear();

  let formattedDate = [year, month, day].join('-') + ' ' + hour + ':' + min + ':' + second;

  let tweetList = state.tweets.slice();
  tweetList.concat({tweet: action.text, timeStamp: formattedDate, isFavorited: false});

  return {
    tweets: tweetList,
    mode: 'default',
    favList: []
  }
}

// Delete Tweet Reducer
function deleteReduce(state, action){
  let tweetList = state.tweets.slice();
  tweetList.splice(action.index, 1);
  return {
    tweets: tweetList.reverse(),
    message: ''
  }
}

// Favorite Tweet Reducer
function favoriteReduce(state, action){
  let id = action.index;
  let items = state.tweets.slice();
  items[id].isFavorited = !items[id].isFavorited
  setFavList(items);
  return {
    tweets: items,
    mode: 'default',
    favList: []
  }
}

  // Favorite
function setFavList(items){
  const favList = items.filter(function(item){
    return item.isFavorited === true;
  });

  favList.sort(function(a, b){
    if(a.timeStamp > b.timeStamp) return -1;
    if(a.timeStamp < b.timeStamp) return 1;
    return 0
  })

  this.setState((state)=>({
    favList: favList
  }));
}

// ClipBoard Tweet Reducer
function clipboardReduce(state, action){
  let text = action.text;
  if(navigator.clipboard){
      navigator.clipboard.writeText(text);
      return true;
  } else {
      return false;
  }
}

// Action Creaters

// Add Tweet Action
export function addTweet(text){
  return {
    type: 'ADD',
    text: text
  }
}

// Add Tweet Action
export function deleteTweet(index){
  return {
    type: 'DELETE',
    index: index
  }
}

// Add Tweet Action
export function favoriteTweet(index){
  return {
    type: 'FAVORITE',
    text: index
  }
}

// Add Tweet Action
export function clipboardTweet(text){
  return {
    type: 'CLIPBOARD',
    text: text
  }
}

export default createStore(tweetReducer);