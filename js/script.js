// Smooth Scroll
(function(){
    $('nav ul li a').click(function(){
        var thisSection=$(this).attr('href');
        $('html').stop().animate({
            scrollTop:$(thisSection).offset().top - 200
        },800,'easeOutCirc');
        return false;

    });
    $('.logo').click(function(){
        const tp=$('#page')
        $('html').stop().animate({
            scrollTop:$(tp).offset().top 
        },500,'easeOutCirc');
        
        return false;
    });

    $('#tabs>ul>li>a').click(function(){
        $('#tabs>ul>li>a').css({background:'#061923',color:'#cecece'})
        $(this).css({background:'#eaeaea',color:'#333'})
        const thistab=$(this).attr('href');
        $('#tabs>div:visible').fadeOut(200,function(){
            $(thistab).fadeIn(200);
        });
    });

    let count=1;
        function rotator(){
          $(`#rotator blockquote:nth-child(${count})`).fadeIn(2000,function(){
            if($(this).is('#rotator blockquote:last-child')){
              setTimeout(function(){
                $(`#rotator blockquote:nth-child(${count})`).fadeOut(2000,function () {
                   count=1; 
                   rotator();
                })
              },7000 )
            }
            else{
               setTimeout(function(){
                $(`#rotator blockquote:nth-child(${count})`).fadeOut(2000,function(){
                    count++
                    rotator()
                })
               },7000 );
            }
          });
        }
        rotator();
    
    $(window).on('load',function(){
        var allLinks=$('nav ul li a');
        var section=$('section')
        var pageTop;
        var counter=0;
        var prevcounter=0;
        var sectiontops=[];
        var doneResizing;

        
            
        $('.flexslider').flexslider();
        
        
        resetpagePosition();
      
        console.log(sectiontops)
    
        $(window).scroll(function(){
            pageTop=$(window).scrollTop()+150;
            console.log(pageTop)
            if(pageTop>sectiontops[counter+1]){
             counter++;
            //  console.log(`scrolling down ${counter}`);
            }
            else if(counter > 0 && pageTop < sectiontops[counter]){
                counter--;
                // console.log(`scrolling up ${counter}`);
    
            }
            if(counter!=prevcounter){
                $(allLinks).removeAttr('class');
                $('nav ul li a').eq(counter).addClass('selected');
                prevcounter=counter;
            }
    
         });
         $(window).on('resize',function(){
            clearTimeout(doneResizing)
            doneResizing=setTimeout(function(){
                resetpagePosition()
            },500)
         });
         function resetpagePosition(){
            sectiontops=[];
                section.each(function(){
                    sectiontops.push(Math.floor($(this).offset().top));
                })
                // pagePosition=position compared to the top of the page after resizing
                var pagePosition= $(window).scrollTop()+200;
                console.log(pagePosition)
                counter=0;
                for(let i=0; i < sectiontops.length; i++){
                    if( pagePosition > sectiontops[i] ){counter++;}
                }
                counter--;
                $(allLinks).removeAttr('class');

                $('nav ul li a').eq(counter).addClass('selected')
         }
    });

    
}())
    