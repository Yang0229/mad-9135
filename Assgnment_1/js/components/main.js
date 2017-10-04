/*****************************************************************
File: compoents/Main.js
Author:  Bo Yang (Tinker)
Description: MAD9135_Assignment_1 
Version: 0.0.1
Updated: October 4, 2017
*****************************************************************/

// #1.....create the title and header (let HeaderTitle)
let HeaderTitle = React.createClass({
    propTypes: {}
    , render: function () {
        return (React.createElement('div', {
            className: 'header'
        }, React.createElement('h1', {}, 'Sneaker files'), ));
    }
});


// #2.....create the Nav menu (let NavMenu)
let NavMenu = React.createClass({
    render: function () {
        return (React.createElement('ul', {
            className: 'nav-menu'
        }, React.createElement('li', {}, React.createElement('a', {
            href: '#'
        }, 'Sneaker files')), React.createElement('li', {}, React.createElement('a', {
            href: '#newItem'
        }, 'Add'))));
    }
});


// #3.....create the list (let listItem)
let listItem = React.createClass({
    propTypes: {
        'id': React.PropTypes.number
        , 'name': React.PropTypes.string.isRequired
        , 'price': React.PropTypes.string.isRequired
        , 'year': React.PropTypes.string.isRequired
    }
    , render: function () {
        return (React.createElement('li', {}, React.createElement('a', {
            className: 'nav-item-link'
            , href: '#/item/' + this.props.id
        }, React.createElement('h2', {
            className: 'list-item-name'
        }, this.props.name), React.createElement('div', {
            className: 'list-item-price'
        }, this.props.price))));
    }
});
let listItems = React.createClass({
    propTypes: {
        'items': React.PropTypes.array.isRequired
    }
    , render: function () {
        return (React.createElement('ul', {
            className: 'list-item-menu'
        }, this.props.items.map(i => React.createElement(listItem, i))));
    }
});


// #4.....create add form
let addItemForm = React.createClass({
    propTypes: {
        'listItem': React.PropTypes.object.isRequired
        , 'onChange': React.PropTypes.func.isRequired
        , 'onAdd': React.PropTypes.func.isRequired
    }
    , onNameChange: function (e) {
        this.props.onChange(Object.assign({}, this.props.listItem, {
            name: e.target.value
        }));
    }
    , onPriceChange: function (e) {
        this.props.onChange(Object.assign({}, this.props.listItem, {
            price: e.target.value
        }));
    }
    , onYearChange: function (e) {
        this.props.onChange(Object.assign({}, this.props.listItem, {
            year: e.target.value
        }));
    }
    , onAdd: function () {
        this.props.onAdd(this.props.listItem);
    }
    , render: function () {
        return (React.createElement('form', {}, React.createElement('input', {
            type: 'text'
            , placeholder: 'Name'
            , value: this.props.listItem.name
            , onChange: this.onNameChange
        }), React.createElement('input', {
            type: 'text'
            , placeholder: 'Price'
            , value: this.props.listItem.price
            , onChange: this.onPriceChange
        }), React.createElement('input', {
            placeholder: 'Year'
            , value: this.props.listItem.year
            , onChange: this.onYearChange
        }), React.createElement('button', {
            type: 'button'
            , onClick: this.onAdd
        }, 'Add')));
    }
});


// create 3 Pages
// #5.....creating main list page
let itemPage = React.createClass({
    propTypes: {
        'items': React.PropTypes.array.isRequired
    }
    , render: function () {
        return (React.createElement(listItems, {
            items: this.props.items
        }));
    }
});


// #5.....create detail page
let itemDetails = React.createClass({
    propTypes: {
        'name': React.PropTypes.string.isRequired
        , 'price': React.PropTypes.string.isRequired
        , 'year': React.PropTypes.string.isRequired
    }
    , render: function () {
        return (React.createElement('div', {
            className: 'list-item-menu-details'
        }, React.createElement('p', {
            className: 'list-name-details'
        }, this.props.name), React.createElement('p', {}, 'Price: ' + this.props.price), React.createElement('p', {}, 'Release Year: ' + this.props.year)));
    }
});


// #6.....create add item page
let addItem = React.createClass({
    propTypes: {
        'listItem': React.PropTypes.object.isRequired
        , 'onNewItemChange': React.PropTypes.func.isRequired
        , 'onAddNewItem': React.PropTypes.func.isRequired
    }
    , render: function () {
        return (React.createElement('div', {}, React.createElement(addItemForm, {
            listItem: this.props.listItem
            , onChange: this.props.onNewItemChange
            , onAdd: this.props.onAddNewItem
        })));
    }
});


// #7.....swich between list and add form
let state = {};
let setState = function (changes) {
    let component;
    let componentProperties = {};
    Object.assign(state, changes);
    let splitUrl = state.location.replace(/^#\/?|\/$/g, '').split('/');
    switch (splitUrl[0]) {
    case 'item':
        {
            component = itemDetails;
            componentProperties = state.items.find(i => i.key == splitUrl[1]);
            break;
        }
    case 'newItem':
        {
            component = addItem;
            componentProperties = {
                listItem: state.listItem
                , onNewItemChange: function (item) {
                    setState({
                        listItem: item
                    });
                }
                , onAddNewItem: function (item) {
                    let itemList = state.items;
                    const newKey = itemList.length + 1;
                    itemList.push(Object.assign({}, {
                        key: newKey
                        , id: newKey
                    }, item));
                    setState({
                        items: itemList
                        , listItem: {
                            name: ''
                            , price: ''
                            , year: ''
                        }
                    });
                }
            };
            break;
        }
    default:
        {
            component = itemPage;
            componentProperties = {
                items: state.items
            };
        }
    }
    let rootElement = React.createElement('div', {}, 
                                          React.createElement(HeaderTitle, {}), 
                                          React.createElement(NavMenu, {}), 
                                          React.createElement(component, componentProperties));
    ReactDOM.render(rootElement, document.getElementById('react-app'));
};
window.addEventListener('hashchange', () => setState({
    location: location.hash
}));
setState({
    listItem: {
        name: ''
        , price: ''
        , year: ''
    }
    , location: location.hash
    , items: items
});