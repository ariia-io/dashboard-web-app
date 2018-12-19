var PropertyAll = React.createClass({   
  
  getInitialState: function () {  
    return {  
              id: '',
              type: '', 
              name: '' ,
              addresses: [],
              tenant_id:'',
              tenant_slug:'', 
              Buttontxt:'Save', 
              data1: []
            };  
    },  
    
    handleChange: function(e) {  
          this.setState({[e.target.name]: e.target.value});  
    },  
    
    componentDidMount() {  
      $.ajax({  
         url: "http://localhost:3000/api/v1/orgs/",  
         type: "GET",  
         dataType: 'json',  
         ContentType: 'application/json',  
         cache: false,
         success: function(data) {           
           this.setState({data1: data});   

         }.bind(this),  
         error: function(jqXHR) {  
           console.log(jqXHR);  
               
         }.bind(this)  
      });  
    },  
      
    DeleteData(id){  
    var propertyDelete = { 'id': id };        
        $.ajax({  
        url: "http://localhost:3000/api/v1/orgs/" + id,  
        dataType: 'json',  
        type: 'DELETE',  
        data: propertyDelete,  
        success: function(data) {  
            alert(data.data);  
            this.componentDidMount();  

        }.bind(this),  
        error: function(xhr, status, err) {  
            alert(err);   
        }.bind(this),  
        });  
    },
     
    EditData(item){this.setState({ 
                        id: item.id,
                        type: item.type,
                        name: item.name,
                        address: item.addresses[0], 
                        tenant_id: item.tenant_id,
                        tenant_slug: item.tenant_slug,
                        Buttontxt:'Update'});  
    },  
    
    handleClick: function() {  
     
     var Url="";
     var op = "";
     if(this.state.Buttontxt=="Save"){  
        Url="http://localhost:3000/api/v1/orgs";  
        op = "POST";
      }  
      else {  
        Url="http://localhost:3000/api/v1/orgs/" + this.item.id;  
        op = "PUT"
      }  
      
      var propertydata = {  
        'type': this.state.id,
        'name': this.state.name,  
        'address':this.state.address,  
        'tenant_id':this.state.tenant_id,  
        'tenant_slug':this.state.tenant_slug
      } 

      $.ajax({  
        url: Url,  
        dataType: 'json',  
        type: op,  
        data: propertydata,  
        cache: false,
        
        success: function(data) {         
            alert(data.data);         
            this.setState(this.getInitialState());  
            this.componentDidMount();  
        }.bind(this),
      
        error: function(xhr, status, err) {  
           alert(err);       
        }.bind(this)  
      });  
    },  
    
    render: function() {  
      return (   
        <div  className="container"  style={{marginTop:'50px'}}>  
         <p className="text-center" style={{fontSize:'25px'}}><b> ARIIA CRUD Opration Using React,Nodejs,Express API,MongoDB</b></p>  
    <form>  
      <div className="col-sm-12 col-md-12"  style={{marginLeft:'400px'}}>   
    <table className="table-bordered">  
       <tbody>  
       <tr>  
        <td><b>Org Type</b></td>  
        <td>  
           <input className="form-control" type="text" value={this.state.type}    name="name" onChange={ this.handleChange } />  
            <input type="hidden" value={this.state.id}    name="id"  />  
        </td>  
      </tr>  
      <tr>  
        <td><b>Name</b></td>  
        <td>  
           <input className="form-control" type="text" value={this.state.name}    name="name" onChange={ this.handleChange } />  
        </td>  
      </tr>  
    
      <tr>  
        <td><b>Address</b></td>  
        <td>  
        <input type="text" className="form-control" value={this.state.address}  name="address" onChange={ this.handleChange } />  
        </td>  
      </tr>  
    
      <tr>  
        <td><b>Tenant ID</b></td>  
        <td>  
          <input type="text"  className="form-control" value={this.state.tenant_id}  name="tenant_id" onChange={ this.handleChange } />  
        </td>  
      </tr>  
    
    
      <tr>  
        <td><b>Tenant Slug</b></td>  
        <td>  
          <input type="text"  className="form-control" value={this.state.tenant_slug}  name="tenant_slug" onChange={ this.handleChange } />  
        </td>  
      </tr>  
    
      <tr>  
        <td></td>  
        <td>  
          <input className="btn btn-primary" type="button" value={this.state.Buttontxt} onClick={this.handleClick} />  
        </td>  
      </tr>  
    
   </tbody>  
      </table>  
  </div>  
     
    
  <div className="col-sm-12 col-md-12 "  style={{marginTop:'50px',marginLeft:'300px'}} >  
     
   <table className="table-bordered"><tbody>  
     <tr><th><b>No.</b></th><th><b>TYPE</b></th><th><b>NAME</b></th><th><b>ADRESS</b></th><th><b>TENANT ID</b></th><th><b>Edit</b></th><th><b>Delete</b></th></tr>  
      {this.state.data1.map((item, index) => (  
          <tr key={index}>  
             <td>{index+1}</td>   
            <td>{item.type}</td>                        
            <td>{item.name}</td>  
            <td>{item.address}</td>  
            <td>{item.tenant_id}</td>  
             <td>   
              
             <button type="button" className="btn btn-success" onClick={(e) => {this.EditData(item)}}>Edit</button>      
            </td>   
            <td>   
               <button type="button" className="btn btn-info" onClick={(e) => {this.DeleteData(item._id)}}>Delete</button>  
            </td>   
          </tr>  
      ))}  
      </tbody>  
      </table>  
       </div>  
  </form>          
        </div>  
      );  
    }  
  });  
    
  ReactDOM.render(<PropertyAll  />, document.getElementById('root'))  