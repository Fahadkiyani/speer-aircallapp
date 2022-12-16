import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Card from './components/Card.js';
import axios from 'axios';
import Header from './Header.jsx';
import LabelBottomNavigation from './components/bottomNavigator/BottomNavigator';
// import HeaderSubParts from './components/HeaderSubParts/HeaderSubParts'
import ArchiveTwoToneIcon from '@mui/icons-material/ArchiveTwoTone';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';

// Import redux
import store from './Redux/store';
import { Provider } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';

import { SetArchivedFeeds, SetActiveFeeds, SetActiveFeedsToArchive } from './Redux/feeds.js';

import './css/app.css'
import { BASE_URL } from './utils/service.js';




const App = () => {
  const [shouldFetch, setShouldFetch] = useState(false);

  // Reading Data from Redux store. 
  const myActiveFeeds = useSelector(state => state.feeds?.ActiveFeeds);
  const myArchivedFeeds = useSelector(state => state.feeds?.ArchivedFeeds);
  const Title = useSelector(state => state.title?.title);

  let dispatch = useDispatch();

  // eslint-disable-next-line
  useEffect(() => {
    let activefeeds = [];
    let archivedfeeds = [];
    const FetchDataNow = async () => {
      let data = await fetchFeeds();
      for (let i = 0; i < await data.length; i++) {
        let d = data[i];
        if (d.is_archived === false) {
          activefeeds.push(d)
        } else {
          archivedfeeds.push(d)
        }
        if (i + 1 === data.length) {
          dispatch(SetActiveFeeds({ activefeeds }));
          dispatch(SetArchivedFeeds({ archivedfeeds }));
        }
      }
    }
    FetchDataNow();
  }, []);

  // eslint-disable-next-line
  useEffect(async () => {
    let activefeeds = [];
    let archivedfeeds = [];
    const FetchDataNow = async () => {
      let data = await fetchFeeds();
      for (let i = 0; i < await data.length; i++) {
        let d = data[i];
        if (d.is_archived === false) {
          activefeeds.push(d)
        } else {
          archivedfeeds.push(d)
        }
        if (i + 1 === data.length) {
          dispatch(SetActiveFeeds({ activefeeds }));
          dispatch(SetArchivedFeeds({ archivedfeeds }));
        }
      }
    }
    FetchDataNow();
    setShouldFetch(false);
  }, [Title, myArchivedFeeds.length, myActiveFeeds.length, shouldFetch]);



  console.log('myActiveFeeds: ', myActiveFeeds);
  console.log('myArchivedFeeds: ', myArchivedFeeds);


  const fetchFeeds = async () => {
    let data = await axios(`${BASE_URL}/activities`);
    return data.data;
  }

  const archiveAll = () => {
    // eslint-disable-next-line
    myActiveFeeds.map((data, i) => {
      axios.patch(`${BASE_URL}/activities/${data.id}`, {
        is_archived: true
      })
        .then(function (response) {
          console.log(response);
          dispatch(SetActiveFeedsToArchive({ id: data.id }))
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  }

  const resetAll = async () => {
    await axios.patch(`${BASE_URL}/reset`);
    setShouldFetch(true)
  }

  return (
    <div className='container'>
      <Header heading={Title} />
      {/* call logs container */}
      <div className="CallLogsContainer" style={{ backgroundColor: 'rgba(200,200,210,0.1)', height: '100%', paddingTop: 20, paddingRight: 20 }}>
        {Title === "Active Feeds"
          ?
          myActiveFeeds.length === 0 ?
            <div onClick={() => { resetAll() }} className='archive_all_calls_container'>
              <RotateLeftIcon />
              <h1 className="archive_all_calls_text">
                Reset all archived items
              </h1>
            </div>
            :
            <div onClick={() => { archiveAll() }} className='archive_all_calls_container'>
              <ArchiveTwoToneIcon />
              <h1 className="archive_all_calls_text">
                Archive all calls
              </h1>
            </div>
          :
          <div onClick={() => { resetAll() }} className='archive_all_calls_container'>
            <RotateLeftIcon />
            <h1 className="archive_all_calls_text">
              Reset all archived items
            </h1>
          </div>
        }
        {/* send data to card and return components from it */}
        {(Title === "Active Feeds") ?
          myActiveFeeds.map((d, i, l) => {
            if (myActiveFeeds.length > 0) {
              return <Card key={d.id} d={d} />
            } else {
              return <div className='no_items'>No active ActiveFeeds to show</div>
            }
          })
          :
          myArchivedFeeds.map((d, i, l) => {
            if (myArchivedFeeds.length > 0) {
              return <Card key={d.id} d={d} />
            } else {
              return <div className='no_items'>No active ActiveFeeds to show</div>
            }
          })
        }

        <div style={{ marginBottom: 200 }}></div>
        <div>
          {/* {myActiveFeeds.length === 0 ? <div className='no_items'>No active ActiveFeeds to show</div> : <></>} */}
        </div>
      </div>
      <div className="bottom_navigation_container">
        <LabelBottomNavigation />
      </div>
    </div>
  );
};

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('app'));

export default App;
