/** Close modal if swipe down is completed */
export function closeOnSwipeDown(e:MouseEvent,contentDiv:HTMLDivElement){
    const targetElement = e.target as HTMLDivElement
    // Only run if user click/swipe content div provided by us
    if(targetElement===contentDiv){
        // Check if content was dragged down pass 50%
        const contentHeight = contentDiv.clientHeight
        // Close content
        if((e.pageY - startCursor) >= contentHeight/2){
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