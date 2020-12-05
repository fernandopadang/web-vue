<script>
import { validPages } from '~/common/api'
export default {
  fetch ({ redirect }) {
    redirect('/' + validPages[0])
  }
}
</script>