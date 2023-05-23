import React, {useContext, useState, useEffect} from 'react';

const ScrollContext = React.createContext({});

export function useScroll(){
  return useContext(ScrollContext);
}

export function ScrollProvider({ children }){

  const [isScrollReachEnd, setIsScrollReachEnd] = useState(false); 

  useEffect(() => {
    window.addEventListener('scroll', function(e){
      setIsScrollReachEnd(window.innerHeight + document.documentElement.scrollTop >= document.documentElement.scrollHeight);
    });
  }, []);

  const value = {
    isScrollReachEnd
  }

  return (
    <ScrollContext.Provider value={value}>
      {children}
    </ScrollContext.Provider>
  );


}