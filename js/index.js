var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var Content = React.createClass({

  getInitialState: function() {

    return {
      items: [
        {id: 1, title: 'Make Mozzarella'},
        {id: 2, title: 'Make Marinara'},
        {id: 3, title: 'Make Dough'},
        {id: 4, title: 'Profit'}
      ],
      previewItem: undefined
    }
  },

  showItemPreview: function(itemId) {
    var itemToShow = this.state.items.find(function(item) {
      return item.id == itemId;
    });

    this.setState({previewItem: itemToShow})
  },

  hideItemPreview: function() {
    this.setState({previewItem: undefined})
  },

  renderLeftContent: function() {
    var preview;

    if(this.state.previewItem) {
      preview = <PreviewCard key="preview-item" item={this.state.previewItem} hidePreview={this.hideItemPreview} />
    }

    return (
      <div className="col s8 m8 left-content">
        <RecommendationsCard key="recommendations" items={this.state.items} showPreview={this.showItemPreview} />

          <ReactCSSTransitionGroup transitionName="pizza" transitionAppear={true} transitionAppearTimeout={500} transitionEnterTimeout={500} transitionLeaveTimeout={500}>
            {preview}
          </ReactCSSTransitionGroup>

      </div>
    )
  },

  renderRightContent: function() {
    return (
      <div className="col s4 m4 right-content">
        <ul>
          <li>Heres a thing</li>
          <li>Heres a thing</li>
          <li>Heres a thing</li>
          <li>Heres a thing</li>
        </ul>
      </div>
    )
  },

  render: function() {
    return (
      <div className="row thrive-plan">
        {this.renderLeftContent()}
        {this.renderRightContent()}
      </div>
    );
  },
});






// SUB COMPONENTS

var PreviewCard = React.createClass({
  propTypes: {
    item: React.PropTypes.object,
    hidePreview: React.PropTypes.func
  },



  render: function() {
    return (
      <div className="preview-card">
        <div className="preview-card-header">
          <p className="back-to-preview" onClick={this.props.hidePreview}>Back</p>
          <h4>{this.props.item.title}</h4>
        </div>
        <p>
        Lorem ipsum dolor sit amet, his et errem impedit legendos, at unum numquam nostrum has.
        Mei offendit suscipit urbanitas id, eum ne legimus suscipit definitiones.
        Te mollis omittantur duo, debitis laboramus at mei. Qui suas nostrum imperdiet te, ei vix
        homero populo mandamus. Scaevola rationibus sadipscing eu vix. Vide possim ne quo, inani
        forensibus vim ei, ad nemore feugiat adversarium pri. Lorem menandri vix et.</p>
      </div>
    )
  }
});



var RecommendationsCard = React.createClass({
  propTypes: {
    items: React.PropTypes.array,
    showPreview: React.PropTypes.func
  },

  render: function() {
    var itemContent = this.props.items.map(function(item) {
      return (
        <RecommendationItem key={item.id} id={item.id} title={item.title} showPreview={this.props.showPreview} />
      )
    }, this);

    return(
      <div className="recommendations">
        {itemContent}
      </div>
    )
  }
});



var RecommendationItem = React.createClass({
  propTypes: {
    id: React.PropTypes.number,
    title: React.PropTypes.string,
    showPreview: React.PropTypes.func
  },

  onClick: function(e) {
    console.log('clicking item', this.props.title);
    e.preventDefault();
    this.props.showPreview(this.props.id);
  },



  render: function() {
    return (
      <div className="item" onClick={this.onClick}>
        <p>{this.props.title}</p>
      </div>
    )
  }
});




React.render(<Content/>, document.getElementById('content'));
