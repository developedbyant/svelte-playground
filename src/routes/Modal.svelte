<script lang="ts">
    export let open:boolean = true
    export let maxHeight:number = 400
    let hoverOn:"content"|"modal"|"none" = "none"
    let swiping:boolean = false
    let startCursor:number = 0
    let contentDiv:HTMLDivElement
    let modalDiv:HTMLDivElement
    $: style = `--height:${maxHeight}px`
    // $: isOpen = open === true
    // $: isClosed = open === false
    // $: if(open===true && contentDiv && !swiping){
    //     contentDiv.style.translate = "unset"
    // }

    /** Handle mouse move to add cursor, translate content and more */
    function handleHover(e:MouseEvent){
        const targetElement = e.target as HTMLDivElement
        // Add hover class to modal or content div
        hoverOn = targetElement.classList.contains("modal") ? "modal" : targetElement.classList.contains("content") ? "content" : "none"
        // Swipe down to close
        if(swiping){
            contentDiv.style.animation = "none"
            contentDiv.style.translate = `0 ${e.pageY-startCursor}px`
        }
    }
    
    /** Close modal when click outside content */
    function closeModal(e:MouseEvent){
        const targetElement = e.target as HTMLDivElement
        if(targetElement===modalDiv){
            open = false
        }
    }

    /** Add swipe down to try to close content div when user click/swipe down */
    function onClickDown(e:MouseEvent){
        const targetElement = e.target as HTMLDivElement
        // Only run if user click/swipe content div provided by us
        if(targetElement===contentDiv){
            swiping = true
            contentDiv.style.transition = "none"
            startCursor = e.pageY
        }
    }

    /** Close modal if swipe down is completed */
    function closeOnSwipeDown(e:MouseEvent){
        const targetElement = e.target as HTMLDivElement
        // Only run if user click/swipe content div provided by us
        if(targetElement===contentDiv){
            swiping = false
            // Check if content was dragged down pass 50%
            const contentHeight = contentDiv.clientHeight
            // Close content
            if((e.pageY - startCursor) >= contentHeight/2){
                open = false
                // contentDiv.style.animation = "none"
                contentDiv.style.transition = "translate ease 0.3s"
                contentDiv.style.translate = "0 100%"
            }
            // Else move content div back to original position
            else{
                contentDiv.style.transition = "translate ease 0.3s"
                contentDiv.style.translate = "0"
            }
        }
    }
</script>

<div class="modal" bind:this={modalDiv} class:closed={!open} class:open class:hover={hoverOn==="modal"}
    on:mousemove={handleHover} on:click={closeModal} role="none">
    <!-- Content -->
    <div class="content" {style} bind:this={contentDiv} class:hover={hoverOn==="content"}
        on:mousedown={onClickDown} on:mouseup={closeOnSwipeDown} role="none">
        <!-- <div class="close">{open}</div> -->
        <slot />
    </div>
</div>

<style>
    .modal{
        z-index: 2;
        position: fixed;
        top: 0; left: 0;
        height: 100vh;
        width: 100%;
        background-color: rgba(0,0,0,.4);
        display: flex;
        align-items: flex-end;
        justify-content: center;
        /* When open */
        transition: all ease-in-out 0.5s;
        opacity: 0%;
        pointer-events: none;
    }
    .modal.hover{
        cursor: pointer;
    }
    .content.hover{
        cursor: grabbing;
    }
    .content{
        max-height: var(--height);
        width: 95%;
        height: 95%;
        background-color: white;
        border-radius: 20px 20px 0 0;
        padding: 20px;
    }
    /* When modal is open */
    .modal.open{
        opacity: 100%;
        pointer-events: all;
    }
    /* When modal content is open */
    .modal.open > .content{
        translate: 0 100%;
        animation: openContent 0.7s forwards;
    }
    /* When modal content is closed */
    .modal.closed > .content{
        animation: closeContent 0.3s forwards;
    }
    @keyframes openContent{
        0%{ translate: 0 100% }
        40%{ translate: 0 0 }
        70%{ translate: 0 2% }
        100%{ translate: 0 0 }
    }
    @keyframes closeContent{
        from{ translate: 0 0 }
        to{ translate: 0 100% }
    }
</style>