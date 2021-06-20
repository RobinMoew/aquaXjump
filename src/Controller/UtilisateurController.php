<?php

namespace App\Controller;

use App\Entity\Personne;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;

class UtilisateurController extends AbstractController
{
    /**
     * @Route("/{_locale}/utilisateur", name="utilisateur")
     */
    public function index(): Response
    {
        return $this->render('utilisateur/index.html.twig', []);
    }

    /**
     * @Route("/getDonneesUtilisateur", name="getDonneesUtilisateur")
     */
    public function getDonneesUtilisateur(Request $request): Response
    {
        $input = $request->get('input');
        if (count($input) < 4) {
            return new Response(1);
        } else {
            $this->get('session')->set('nom', $input[0]);
            $this->get('session')->set('prenom', $input[1]);
            $this->get('session')->set('sexe', $input[2]);
            $this->get('session')->set('age', $input[3]);
            $entityManager = $this->getDoctrine()->getManager();
            $personne = new Personne();
            $personne->setNom($input[0]);
            $personne->setPrenom($input[1]);
            $input[2] == 'male' ? $personne->setSexe(1) : $personne->setSexe(2);
            $personne->setAge($input[3]);
            date_default_timezone_set('Europe/Paris');
            $personne->setEnregistrement(new \DateTime('NOW'));
            $entityManager->persist($personne);
            $entityManager->flush();
        }
        return new Response(0);
    }

    /**
     * @Route("/{_locale}/certif", name="certif")
     */
    public function certif(): Response
    {
        return $this->render('utilisateur/certif.html.twig', [
            'nom' => $this->get('session')->get('nom'),
            'prenom' => $this->get('session')->get('prenom'),
            'sexe' => $this->get('session')->get('sexe'),
            'age' => $this->get('session')->get('age'),
        ]);
    }

    /**
     * @Route("/{_locale}/declaration", name="declaration")
     */
    public function declaration(): Response
    {
        return $this->render('utilisateur/declaration.html.twig', [
            'nom' => $this->get('session')->get('nom'),
            'prenom' => $this->get('session')->get('prenom'),
            'sexe' => $this->get('session')->get('sexe'),
            'age' => $this->get('session')->get('age'),
        ]);
    }

    /**
     * @Route("/{_locale}/nOk", name="nOk")
     */
    public function nOk(): Response
    {
        return $this->render('utilisateur/nOk.html.twig', []);
    }

    /**
     * @Route("/{_locale}/ok", name="ok")
     */
    public function ok(): Response
    {
        return $this->render('utilisateur/ok.html.twig', []);
    }

    /**
     * @Route("/upload", name="upload")
     */
    public function upload(Request $request): Response
    {
        // new filename
        $filename = $this->getParameter('images_directory') . 'pic_' . date('YmdHis') . '.jpeg';
        
        // open the output file for writing
        $ifp = fopen($filename, 'wb');

        // split the string on commas
        // $data[ 0 ] == "data:image/png;base64"
        // $data[ 1 ] == <actual base64 string>
        $data = explode(',', $request->get('img'));

        // we could add validation here with ensuring count( $data ) > 1
        fwrite($ifp, base64_decode($data[1]));

        // clean up the file resource
        fclose($ifp);

        return new Response(0);
    }
}
