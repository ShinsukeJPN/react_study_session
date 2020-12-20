function Reply() {
  return (
    <div>
      <form onSubmit={this.onSubmit}>
        <textarea onChange={this.onChange}/>
        <SubmitButton value="リプ"/>
      </form>
    </div>
  );
}

export default Reply;
