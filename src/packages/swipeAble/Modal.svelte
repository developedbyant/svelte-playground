<script lang="ts">
    export let open:boolean = true
    export let maxHeight:number = 400
    let hoverOn:"content"|"modal"|"none" = "none"
    let swipeCursorStartAt:number|undefined = undefined
    let topSpacing:number
    let contentDiv:HTMLDivElement
    $: style = `--height:${maxHeight}px`

    /** Handle mouse move to add cursor, translate content and more */
    function handleHover(e:MouseEvent){
        const targetElement = e.target as HTMLDivElement
        // Add hover class to modal or content div
        const isContentDiv = targetElement.classList.contains("content")
        const isModalDiv = targetElement.classList.contains("modal")
        hoverOn = isModalDiv ? "modal" : isContentDiv ? "content" : "none"
        // Swipe down to close
        const topSpacingNotCrossed = topSpacing > contentDiv.getBoundingClientRect().top
        if(contentDiv===targetElement && swipeCursorStartAt!==undefined && !topSpacingNotCrossed){
            targetElement.style.transition = "none"
            targetElement.style.translate = `0 ${e.pageY-swipeCursorStartAt}px`
        }else if(topSpacingNotCrossed){
            contentDiv.style.transition = "translate ease 0.3s"
            contentDiv.style.translate = ""
            swipeCursorStartAt = undefined
        }
    }
    
    /** Close modal when click outside content */
    function closeModal(e:MouseEvent){
        const targetElement = e.target as HTMLDivElement
        const isModalDiv = targetElement.classList.contains("modal")
        // Close modal
        if(isModalDiv){ open = false }
    }

    /** Add swipe down to try to close content div when user click/swipe down */
    function onClickDown(e:MouseEvent){
        const targetElement = e.target as HTMLDivElement
        // Only run if user click/swipe content div provided by us
        if(contentDiv===targetElement){
            topSpacing = contentDiv.getBoundingClientRect().top
            swipeCursorStartAt = e.pageY
        }
    }

    /** Close modal if swipe down is completed */
    function closeOnSwipeDown(e:MouseEvent){
        const targetElement = e.target as HTMLDivElement
        // Only run if user click/swipe content div provided by us
        if(targetElement===contentDiv){
            // Check if content was dragged down pass 50%
            const contentHeight = contentDiv.clientHeight
            // Close content
            if((e.pageY - swipeCursorStartAt!) >= contentHeight/2){
                open = false
                contentDiv.style.transition = "translate ease 0.6s"
                contentDiv.style.translate = "0 100%"
            }
            // Else move content div back to original position
            else{
                contentDiv.style.transition = "translate ease 0.3s"
                contentDiv.style.translate = "0 0"
            }
            setTimeout(()=>{ contentDiv.style.translate = "" },100)
            swipeCursorStartAt = undefined
        }
    }
</script>

<div class="modal {open?"open":"closed"}" class:hover={hoverOn==="modal"} on:mousemove={handleHover} on:click={closeModal} role="none">
    <!-- Content -->
    <div class="content" bind:this={contentDiv} {style} class:hover={hoverOn==="content"} on:mousedown={onClickDown} on:mouseup={closeOnSwipeDown} role="none">
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
        /* When open */
        transition: translate ease-in-out 0.2s;
        translate: 0 100%;
    }
    /* When modal is open */
    .modal.open{
        opacity: 100%;
        pointer-events: all;
    }
    /* When modal content is open */
    .modal.open > .content{
        translate: 0 0;
    }
</style>