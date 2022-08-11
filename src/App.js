import {useState, useEffect} from 'react';

import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';
import './App.css';

const App = () => {

    const [searchField, setSearchField] = useState(''); //[value, setValue]
    const [title, setTitle] = useState('Monsters Rolodex');
    const [monsters, setMonsters] = useState([]); //[value, setValue]
    const [filteredMonsters, setFilteredMonsters] = useState(monsters);

    console.log('rendered');

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then((users) => setMonsters(users)
            );
    }, []);

    useEffect(() => {
        const newFilteredMonsters = monsters.filter((monster) => {
            return monster.name.toLocaleLowerCase().includes(searchField);
        });

        setFilteredMonsters(newFilteredMonsters);

    }, [monsters, searchField]);

    //console.log(searchField);

    const onSearchChange = (event) => {
        const searchFieldString = event.target.value.toLocaleLowerCase();
        setSearchField(searchFieldString);
    }

    const onTitleChange = (event) => {
        const searchFieldString = event.target.value.toLocaleLowerCase();
        setTitle(searchFieldString);
    }

    return (

        <div className="App">

            <h1 className='app-title'>{title}</h1>
            <SearchBox
                className='monsters-search-box'
                onChange={onSearchChange}
                placeoholder='Search monsters'
            />

            <br/>

            <SearchBox
                className='title-search-box'
                onChange={onTitleChange}
                placeoholder='Set title'
            />

            <CardList monsters={filteredMonsters}/>

        </div>);

}

/*
class App extends Component {

    constructor() {
        super();

        this.state = {
            monsters: [],
            searchField: ''
        };

        // console.log('1 - constructor');
    }

    componentDidMount() {

        //console.log('3 - componentDidMount');

        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then((users) => this.setState(() => {
                return {monsters: users}
            }, () => {
                //console.log(this.state);
            }))

    }

    onSearchChange = (event) => {
        const searchField = event.target.value.toLocaleLowerCase();
        this.setState(() => {
            return {searchField}
        });
    }

    render() {

        // console.log('2 - render');

        const {monsters, searchField} = this.state;
        const {onSearchChange} = this;

        const filteredMonsters = monsters.filter((monster) => {
            return monster.name.toLocaleLowerCase().includes(searchField);
        });

        return (

            <div className="App">

            <h1 className='app-title'>Monsters Rolodex</h1>
                <SearchBox
                    className='monsters-search-box'
                    onChange={onSearchChange}
                    placeoholder='Search monsters'
                />

                <CardList monsters={filteredMonsters}/>

            </div>
        );
    }
}
*/

export default App;
