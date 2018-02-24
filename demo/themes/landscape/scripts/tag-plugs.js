hexo.extend.tag.register('wordsketch', function (args, content) {
  if(content){
    return `<span class="height-lighted-word" style="font-weight:600;color:#4034df;">${content}</span>`
  }
}, {
  async: true,
  ends: true
});