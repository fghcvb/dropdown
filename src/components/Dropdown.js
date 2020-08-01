import React, { Component } from 'react'

//Dropdown
class Dropdown extends Component {
  constructor(props) {
    super(props);

    //initialState
    this.state = {
      value: '',
      expanded: false,
      itemsToShow: 5,
      countries: [
        { key: 'Singapore', text: 'Singapore', value: 'Singapore' },
        { key: 'Malaysia', text: 'Malaysia', value: 'Malaysia' },
        { key: 'Indonesia', text: 'Indonesia', value: 'Indonesia' },
        { key: 'Philippines', text: 'Philippines', value: 'Philippines' },
        { key: 'Thailand', text: 'Thailand', value: 'Thailand' },
        { key: 'India', text: 'India', value: 'India' },
        { key: 'America', text: 'America', value: 'America' }

      ]
    }
    //Binding Event
    this.showMore = this.showMore.bind(this);
    this.handleAddition = this.handleAddition.bind(this);
    this.change = this.change.bind(this);
  }

  //handleAddition
  handleAddition = (e) => {
    const newCountry = this.state.value;
    this.setState((prevState) => ({
      countries: [{ text: newCountry, value: newCountry }, ...prevState.countries],
    }))
  }

  //showMore
  showMore() {
    this.state.itemsToShow == 5 ? (
      this.setState({ itemsToShow: this.state.countries.length, expanded: true })
    ) : (
        this.setState({ itemsToShow: 5, expanded: false })
      )
  }

  //change
  change(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    const filteredOptions = this.state.countries.filter(op => op.text.toLowerCase().includes(this.state.value.toLowerCase()));
    return (
      <div className="text-center">
        <h3 className="headerBottom mt-5">Standard Drop-down & Search non existing / Add n Select</h3>
        <div className="row form-group">
          <div className="offset-md-5 col-md-3 text-left">
            <div class="form-group">
              <select className="form-control selectDropdown" placeholder="Select a location"
                value={this.state.value}
                onChange={this.change}>
                {
                  this.state.countries.map(country => {
                    return (
                      <option key={country.key} value={country.value}>
                        {country.text}
                      </option>
                    )
                  })
                }
              </select>
            </div>
            <p><b>{this.state.value}</b></p>
            <div class="form-group has-search mt-3">
              <span class="fa fa-search form-control-feedback"></span>
              <input type="text" class="form-control" placeholder="Search..." value={this.state.value}
                onChange={evt => {
                  this.setState({ value: evt.target.value })
                }}></input>
            </div>
            <div className="row ">
              <div className="col-md-8">
                <ul className="countryList">
                  {filteredOptions.slice(0, this.state.itemsToShow).map(op => <li key={op.key}>
                    {op.value}
                  </li>)}
                  {filteredOptions.length == 0 && <span>"{this.state.value}" not found&nbsp;&nbsp;</span>}
                  {filteredOptions.length == 0 && <button className="btn addBtn" onClick={this.handleAddition}>Add & Select</button>}

                </ul>
              </div>
              <div className="col-md-4">
                <a className="btn linkPadding" onClick={this.showMore}>
                  {this.state.expanded ? (
                    ''
                  ) : (
                      <span>{this.state.countries.length - this.state.itemsToShow} more...</span>
                    )}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

}

export default Dropdown
