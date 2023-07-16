<script lang="ts">
    import"./app.css"
    import Modal from "./Modal.svelte";
    import Modal2 from "../packages/swipeAble/Modal.svelte";
    import Posts from "./Posts.svelte";
    let modalOpen:boolean = false
    function openModal(){
        modalOpen = !modalOpen
    }
</script>

<div class="page">
    <button on:click={openModal}>Open</button>
    <Modal2 bind:open={modalOpen}>
        <Posts count={50}/>
    </Modal2>
</div>

<style>
    .page{
        position: relative;
        min-height: 100vh;
        background: linear-gradient(#a564e6, #ff3d02ab);
        display: flex;
        align-items: center;
        justify-content: center;
    }
    button{
        all: unset;
        cursor: pointer;
        background: #FF3F02;
        padding: 10px 20px;
        border-radius: 2px;
        box-shadow: 1px 2px 4px rgba(0,0,0,5%);
        font-size: 14px;
        font-weight: 700;
        color: white;
        margin: 20px;
        
    }
</style>
