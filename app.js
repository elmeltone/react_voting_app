const ProductList = React.createClass({
  getInitialState: function () {
    return {
      products: [],
      descending: true,
    };
  },
  componentDidMount: function () {
    this.updateState();
  },
  updateState: function () {
    const products = Data.sort((a, b) => {
      if (this.state.descending) {
        return b.votes - a.votes;
      } else {
        return a.votes - b.votes;
      };
    });
    this.setState({ products: products });
  },
  handleSort: function () {
    console.log(this.state.descending);
    this.setState({descending: !this.state.descending}, function() {
      this.updateState();
    });
  },
  handleProductUpVote: function (productId) {
    Data.forEach((el) => {
      if (el.id === productId) {
        el.votes = el.votes + 1;
        return;
      }
    });
    this.updateState();
  },
  handleProductDownVote: function (productId) {
    Data.forEach((el) => {
      if (el.id === productId) {
        el.votes = el.votes - 1;
        return;
      }
    });
    this.updateState();
  },
  render: function () {
    const products = this.state.products.map((product) => {
      return (
        <Product
          key={'product-' + product.id}
          id={product.id}
          title={product.title}
          description={product.description}
          url={product.url}
          votes={product.votes}
          submitter_avatar_url={product.submitter_avatar_url}
          product_image_url={product.product_image_url}
          onVote={this.handleProductUpVote}
          onUnvote={this.handleProductDownVote}
        />
      );
    });
    return (
      <div className='ui items'>
    <SortButton
      onSort={this.handleSort}
    />
        {products}
      </div>
    );
  },
});

const SortButton = React.createClass({
  handleSort: function () {
    this.props.onSort(this.props);
  },
  render: function () {
    return (
    <button onClick={this.handleSort}>Sort most/least</button>
    )
  }
});

const Product = React.createClass({
  handleUpVote: function () {
    this.props.onVote(this.props.id);
  },
  handleDownVote: function () {
    this.props.onUnvote(this.props.id);
  },
  render: function () {
    return (
      <div className='item'>
        <div className='image'>
          <img src={this.props.product_image_url} />
        </div>
        <div className='middle aligned content'>
          <div className='header'>
            <a onClick={this.handleUpVote}>
              <i className='large caret up icon'></i>
            </a>
            {this.props.votes}
            <a onClick={this.handleDownVote}>
              <i className='large caret down icon'></i>
            </a>
          </div>
          <div className='description'>
            <a href={this.props.url}>
              {this.props.title}
            </a>
          </div>
          <div className='extra'>
            <span>Submitted by:</span>
            <img
              className='ui avatar image'
              src={this.props.submitter_avatar_url}
            />
          </div>
        </div>
      </div>
    );
  },
});

ReactDOM.render(
  <ProductList />,
  document.getElementById('content')
);
