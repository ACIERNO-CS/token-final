# State Management Explanation

There are three main States controlled in this application. 

## isMobile
The first is a useContext, that supplies the isMobile condition to subelements. This allows the site to consistently respond to both different screen sizes, such as desktop and mobile, and changes in screen size, such as from resizing a desktop window.
It is modified through
```js
function handleWindowSizeChange() {
    setIsMobile(window.innerWidth <= 768);
}

useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    handleWindowSizeChange()
    return () => {
        window.removeEventListener("resize", handleWindowSizeChange);
    };
}, []);
```
and accessed through a provider element.
```js
import { createContext } from "react";
export const isMobileContext = createContext({ isMobile: false });
```
```html
<isMobileContext.Provider value={{ isMobile }}>
```

## Search
The second is a useState, that gives the search bar functionality. Updating the search bar updates this state, allowing it to be accessed throughout the element.
```js
const [search, setSearch] = useState('')
```

## useQuery
The third is a query function, that calls the CoinGecko coin endpoint on each Token element. React Query was chosen over ContextAPI because each Token element can be easily isolated from each other, and over Zustand because React Query is better aligned with server-side state management. That is, Zustand is a tool better used for client state management, while React Query is better when interacting with server-side data.

```js
const { data, isLoading, error, refetch } = useQuery({
    queryKey: [`token_${name}`], 
    queryFn: () => coin.searchTokens(name.toLowerCase()),
    staleTime: 30 * 60000, // 30 minutes
})
```
The staletime is set to 30 minutes, as the user is meant to manually refresh each result. However, it is still enabled, to prevent a user from forgetting entirely that this is the case.