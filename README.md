# React movie website

React movie search project using TMDB API for interview testing\
Everything on this project is working on client side only
## Features

- Searching by film name
- Adjust each film price
- Item cart
- Discount
  * more than 3 discount 10% (4-5 item)
  * mroe than 5 discount 20% (6+ item)
- Stored item cart in localStorage
- Clear item cart
- Payment with count down timer, 1 minutes

## Installation
1. Using npm to install package
```bash
npm install
```
2. Get API key from www.themoviedb.org
3. Create `.env` file at root of project
4. In `.env` add
```
VITE_APIKEY="***"
VITE_DEFALUTPRICE=100
VITE_WEBNAME="React Movie"
```
- VITE_APIKEY: API key from www.themoviedb.org
- VITE_DEFALUTPRICE: Default price for none adjust film price
- VITE_WEBNAME: Prefix title of page

## How to run
In root of project run this in terminal for testing in dev mode
```
npm run dev
```

## How to adjust price
Because of adjust price should belong in admin page but from challenge of interview testing that not require admin page  
I have create adjust price page in path `/movie/:id/edit`  
For example  
1. I want to change price of 'The Lord of the Rings' and ID of 'The Lord of the Rings' is 123  
2. Then go to path `/movie/123/edit`  
![Home1](https://github.com/MeRrai333/react_movie_website/blob/main/ui/change_price_ui.png?raw=true)  
3. Change price  
4. Save!


## Example UI
![Home1](https://github.com/MeRrai333/react_movie_website/blob/main/ui/Home_1.png?raw=true)
    
![Home2](https://github.com/MeRrai333/react_movie_website/blob/main/ui/Home_2.png?raw=true)
    
![Home3](https://github.com/MeRrai333/react_movie_website/blob/main/ui/Home_3.png?raw=true)
    
![Movie_Detail](https://github.com/MeRrai333/react_movie_website/blob/main/ui/Movie_Detail.png?raw=true)
    
![Movie_Adjust](https://github.com/MeRrai333/react_movie_website/blob/main/ui/Movie_Adjust.png?raw=true)
    
![Cart1](https://github.com/MeRrai333/react_movie_website/blob/main/ui/Cart_1.png?raw=true)
    
![Cart2](https://github.com/MeRrai333/react_movie_website/blob/main/ui/Cart_2.png?raw=true)
    
![Cart3](https://github.com/MeRrai333/react_movie_website/blob/main/ui/Cart_3.png?raw=true)
    
![Ordering](https://github.com/MeRrai333/react_movie_website/blob/main/ui/Ordering.png.png?raw=true)
