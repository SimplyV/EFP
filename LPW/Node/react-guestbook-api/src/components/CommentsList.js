import React from "react";
import axios from "axios";

class CommentsList extends React.Component{
  constructor(){
    super()

    this.state = {
      isCommentsListLoading: false,
      commentsList: []
    }
  }

  sendComment(event){

    event.preventDefault();
    const formData = new FormData(event.target);
    const name = formData.get('name'); 
    const message = formData.get('comment');

    axios.post(process.env.REACT_APP_BASEURL + "guestbook", {
      pseudo: name,
      message: message
    })
    .then(response => {
      this.setState(prevState => ({
        commentsList: prevState.commentsList.concat({pseudo: name, message: message})
      }));

      const inputs = event.target.querySelectorAll(".input-form");
        inputs.forEach(input => {
          input.value = "";
        });
    
    })
    .catch(error => {
      console.log(error);
    });
  }

  editComment(id, index){

    let inputPseudo = document.querySelector('li[data-id="'+id+'"] input[name="pseudo-edit"]');
    let inputMessage = document.querySelector('li[data-id="'+id+'"] input[name="message-edit"]');
    let editBtn = document.querySelector('li[data-id="'+id+'"] .edit-btn');
    let validateEdit = document.querySelector('li[data-id="'+id+'"] .validate-edit-btn');
    var pseudoInitial = document.querySelector('li[data-id="'+id+'"] input[name="pseudo-edit"]').value;
    var messageInitial = document.querySelector('li[data-id="'+id+'"] input[name="message-edit"]').value;
    let error = document.querySelector('.error');
    inputMessage.style.display = 'flex';
    inputPseudo.style.display = 'flex';
    editBtn.style.display = 'none';
    validateEdit.style.display = 'flex';

    validateEdit.addEventListener('click', ()=>{
      
      var pseudoFinal = document.querySelector('li[data-id="'+id+'"] input[name="pseudo-edit"]').value;
      var messageFinal = document.querySelector('li[data-id="'+id+'"] input[name="message-edit"]').value;

      if(pseudoFinal === pseudoInitial && messageFinal === messageInitial){
        inputMessage.style.display = 'none';
        inputPseudo.style.display = 'none';
        editBtn.style.display = 'flex';
        validateEdit.style.display = 'none';
        return;
      }

      if(pseudoFinal == '' && messageFinal == ''){
        error.innerHTML = "Les 2 champs ne peuvent être vides !"
        return;
      }
      if(pseudoFinal == '' || messageFinal == ''){
        error.innerHTML = 'Le champ texte ne peut être vide';
        return;
      }

      const payload = {
        pseudo: pseudoFinal,
        message: messageFinal
      }
      
      axios.put(process.env.REACT_APP_BASEURL + "guestbook/" +id, payload)
      .then(response => {
        
        const l = this.state.commentsList;
        l[index] = payload;

        this.setState({
          commentsList: l
        })

        inputMessage.style.display = 'none';
        inputPseudo.style.display = 'none';
        editBtn.style.display = 'flex';
        validateEdit.style.display = 'none';
      
      })
      .catch(error => {
        console.log(error);
      });
    })

   

  }

  deleteComment(id){
    axios.delete(process.env.REACT_APP_BASEURL + "guestbookDelete/" + id)
    .then(response => {
      console.log(response);
      document.querySelector('li[data-id="'+id+'"]').remove();
    })
    .catch(error => {
      console.log(error);
    });
  }

  async getAllComments(){
    this.setState({ isCommentsListLoading : true});
    const  response  = await axios({
      url: process.env.REACT_APP_BASEURL + "guestbook",
      method: "GET",
      responseType: "json",
    });
    console.log(response);
    const data = response.data;
    
    this.setState({ commentsList: data.results, isCommentsListLoading: false });
  }

  componentDidMount(){
    this.getAllComments();
  
  }

  render(){
    return (
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:py-12 sm:px-6 lg:px-8">
        <div className="pb-6 pt-6">
          <form className="flex gap-8 items-center" onSubmit={(event) => this.sendComment(event)}>
            <input type="text" placeholder="Votre prénom" className="border-black border-2 p-2 rounded input-form" name="name" required></input>
            <input type="text" placeholder="Entrez un commentaire" className="border-black border-2 p-2 rounded input-form" name="comment" required></input>
            <button type="submit" className="rounded-full w-20 h-20 p-5 text-black"> Envoyer </button>
          </form>
          
        </div>
        {this.state.isCommentsListLoading ? (
          <div className="text-center">
            <div role="status">
              <svg
                aria-hidden="true"
                className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
            {this.state.commentsList.map((comment, i) => (
            
              <li key={i} className=" pt-3 sm:pt-4 pb-3 sm:pb-4" data-id={comment.id}>
                <div className="flex items-center space-x-4">
                  <div className="flex min-w-full justify-between items-center">
                    <p className="text-sm font-medium text-gray-900 truncate ">
                      {comment.pseudo}
                      <input type="text" defaultValue={comment.pseudo} name="pseudo-edit" className="hidden border-black border-2 p-2 rounded mt-2"></input>
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                      {comment.message}
                      <input type="text" defaultValue={comment.message} name="message-edit" className="hidden border-black border-2 p-2 rounded mt-2"></input>
                    </p>
                    <p className="cursor-pointer deleteComment" onClick={() => this.deleteComment(comment.id)} >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5">
                        <path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/>
                      </svg>
                    </p>
                    <p className="cursor-pointer hidden validate-edit-btn">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-black">
                        <path d="M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/>
                      </svg>
                    </p>
                    <p className="cursor-pointer edit-btn" onClick={() => this.editComment(comment.id, i)}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-black">
                        <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.8 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"/>
                      </svg>
                    </p>
                  </div>
                </div>
                <p className="error"></p>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}
export default CommentsList;